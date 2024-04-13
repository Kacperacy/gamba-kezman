pipeline {
    agent any
    environment {
        VITE_TWITCH_APP_CLIENT_ID = credentials('twitch-app-client-id')
        VITE_TWITCH_OAUTH_URL = credentials('twitch-oauth-url')
        VITE_TWITCH_LOGIN_REDIRECT_URI = credentials('twitch-login-redirect-uri')
        TWITCH_APP_CLIENT_ID = credentials('twitch-app-client-id')
        TWITCH_APP_CLIENT_SECRET = credentials('twitch-app-client-secret')
        TWITCH_APP_REDIRECT_URI = credentials('twitch-app-redirect-uri')
        DB_CONN_STRING = credentials('db-conn-string')
        RIOT_API_KEY = credentials('riot-api-key')
        USERS_DB_NAME = credentials('users-db-name')
        USERS_COLLECTION_NAME = credentials('users-collection-name')
    }
    stages {
        stage('Build Backend') {
            steps {
                sh 'cd backend && npm install'
            }
        }
        stage('Deploy Backend') {
            steps {
                sh 'cd backend && npm run start'
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }
        stage('Deploy Frontend') {
            steps {
                sh 'cd frontend && serve dist -s -p 5173'
            }
        }
    }
}