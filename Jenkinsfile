pipeline {
    agent {
        kubernetes {
            yamlFile 'jenkins/podTemplate.yaml'
        }
    }

    options {
        buildDiscarder(logRotator(daysToKeepStr: '30', numToKeepStr: '5'))
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
                    sh 'npm install'
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build & Push (Kaniko)') {
            steps {
                container('kaniko') {
                    script {
                        def image = "joe44824/web-portfolio:${env.BUILD_NUMBER}"
                        sh """
                          /kaniko/executor \
                            --context ${WORKSPACE} \
                            --dockerfile ${WORKSPACE}/Dockerfile \
                            --destination=${image} \
                            --cleanup
                        """
                    }
                }
            }
        }
    }
}
