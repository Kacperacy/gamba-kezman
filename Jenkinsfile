pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/Kacperacy/gamba-kezman'
            }
        }
        stage('Build Backend') {
            steps {
                dir('backend'){
                    sh 'docker build -t gamba-kezman-backend .'
                }
            }
        }
        stage('Deploy Backend') {
            steps {
                sh 'docker stop gamba-kezman-backend || true'
                sh 'docker rm gamba-kezman-backend || true'
                sh 'docker run -d --name gamba-kezman-backend -p 3000:3000 --env-file backend/.env gamba-kezman-backend'
            }
        }
        stage('Build Frontend') {
            steps {
                dir('frontend'){
                    sh 'docker build -t gamba-kezman-frontend .'
                }
            }
        }
        stage('Deploy Frontend') {
            steps {
                sh 'docker stop gamba-kezman-frontend || true'
                sh 'docker rm gamba-kezman-frontend || true'
                sh 'docker run -d --name gamba-kezman-frontend -p 5173:5173 --env-file frontend/.env gamba-kezman-frontend'
            }
        }
    }
}