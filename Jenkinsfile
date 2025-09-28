pipeline {
    agent any
    
    tools {
        nodejs "NodeJS 24"
    }

    options {
        buildDiscarder logRotator(artifactDaysToKeepStr: '', artifactNumToKeepStr: '', daysToKeepStr: '30', numToKeepStr: '5')
    }

    
    stages {
        stage('Check Out') {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/joe44824/web-portfolio.git']])
            }
        }
        stage('NPM Build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t web-portfolio .' 
            }
        }
    }
}