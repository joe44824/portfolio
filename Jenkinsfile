pipeline {
    agent {
        kubernetes {
            yamlFile 'jenkins/podTemplate.yaml'
        }
    }

    environment {
        DOCKER_REGISTRY = 'joe44824'
        IMAGE_NAME = 'web-portfolio'
        IMAGE_TAG = "${env.BUILD_NUMBER}"
        GIT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build & Test') {
            steps {
                container('node') {
                    sh '''
                        npm ci
                        npm test
                        npm run build
                    '''
                }
            }
        }

        stage('Build & Push Docker Image') {
            steps {
                container('kaniko') {
                    sh """
                        /kaniko/executor \
                            --context="\${WORKSPACE}" \
                            --dockerfile="\${WORKSPACE}/Dockerfile" \
                            --destination=\${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG} \
                            --destination=\${DOCKER_REGISTRY}/\${IMAGE_NAME}:latest \
                            --cache=true \
                            --cleanup
                    """
                }
            }
        }

        stage('Update Kustomize for GitOps') {
            steps {
                container('kubectl') {
                    script {
                        def environment = (env.BRANCH_NAME == 'main') ? 'production' : 'dev'
                        def kustomizePath = "k8s/overlays/${environment}"
                        
                        sh """
                            cd ${kustomizePath}
                            kustomize edit set image ${DOCKER_REGISTRY}/${IMAGE_NAME}=${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}
                            
                            echo "Updated image tag to ${IMAGE_TAG}"
                            cat kustomization.yaml
                        """
                    }
                }
            }
        }

        stage('Commit & Push to Git') {
            steps {
                container('kubectl') {
                    withCredentials([usernamePassword(
                        credentialsId: 'github-credentials',
                        usernameVariable: 'GIT_USER',
                        passwordVariable: 'GIT_TOKEN'
                    )]) {
                        sh """
                            git config user.email "jenkins@ci.com"
                            git config user.name "Jenkins CI"
                            
                            git add k8s/overlays/*/kustomization.yaml
                            git commit -m "CI: Update image to ${IMAGE_TAG} [${GIT_COMMIT}]" || echo "No changes to commit"
                            
                            # Push changes back to repository
                            git push https://\${GIT_USER}:\${GIT_TOKEN}@github.com/joe44824/portfolio.git HEAD:${BRANCH_NAME}
                            
                            echo "✅ GitOps update pushed to repository"
                            echo "🔄 ArgoCD will automatically detect changes and sync"
                        """
                    }
                }
            }
        }
    }

    post {
        success {
            echo "✅ CI Pipeline completed! ArgoCD will handle deployment automatically"
        }
    }
}