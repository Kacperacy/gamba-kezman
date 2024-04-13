pipeline {
    agent any
    stages {
        stage('Retrieve .env files') {
            steps {
                script {
                    // Retrieve backend .env file content
                    def backendEnvContent = credentials('backend_env_credentials')
                    
                    // Retrieve frontend .env file content
                    def frontendEnvContent = credentials('frontend_env_credentials')
                    
                    // Parse and inject backend environment variables
                    parseAndInjectEnv(backendEnvContent)
                    
                    // Parse and inject frontend environment variables
                    parseAndInjectEnv(frontendEnvContent)
                }
            }
        }
        stage('Build Frontend') {
            steps {
                sh 'cd frontend && npm install && npm run build'
            }
        }
        stage('Build Backend') {
            steps {
                sh 'cd backend && npm install && npm run build'
            }
        }
        stage('Deploy Frontend') {
            steps {
                sh 'cd frontend && serve dist -s -p 5173'
            }
        }
        stage('Deploy Backend') {
            steps {
                sh 'cd backend && npm run start'
            }
        }
    }
}

def parseAndInjectEnv(envContent) {
    envContent.split('\n').each { line ->
        def keyValue = line.split('=')
        if (keyValue.size() == 2) {
            env[keyValue[0].trim()] = keyValue[1].trim()
        }
    }
}