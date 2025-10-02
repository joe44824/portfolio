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
    }

    options {
        buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '5'))
        timeout(time: 30, unit: 'MINUTES')
        timestamps()
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('NPM Build') {
            steps {
                container('node') {
                    sh '''
                        npm ci --prefer-offline --no-audit
                        npm run build
                    '''
                }
            }
        }

        stage('Docker Build & Push') {
            steps {
                container('kaniko') {
                    sh """
                        /kaniko/executor \
                            --context=\${WORKSPACE} \
                            --dockerfile=\${WORKSPACE}/Dockerfile \
                            --destination=\${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG} \
                            --destination=\${DOCKER_REGISTRY}/\${IMAGE_NAME}:latest \
                            --cache=true \
                            --cache-ttl=24h \
                            --compressed-caching=false \
                            --snapshot-mode=redo \
                            --cleanup
                    """
                }
            }
        }

        stage('Update Deployment') {
            steps {
                container('node') {
                    sh """
                        echo "Image built and pushed: \${DOCKER_REGISTRY}/\${IMAGE_NAME}:\${IMAGE_TAG}"
                        # Add kubectl commands here to update your deployment if needed
                    """
                }
            }
        }
    }

    post {
        success {
            echo "✅ Pipeline succeeded! Image: ${DOCKER_REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
        }
        failure {
            echo "❌ Pipeline failed!"
        }
        cleanup {
            cleanWs()
        }
    }
}