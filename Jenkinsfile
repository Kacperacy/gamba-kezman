pipeline {
    agent any
    stages {
        stage('Retrieve .env files') {
            steps {
                script {
                    // Retrieve backend .env file content
                    def backendEnvContent = credentials('4e484dcd-0b9a-48e6-8b20-6934d23e80cb')
                    
                    // Retrieve frontend .env file content
                    def frontendEnvContent = credentials('0e7fd50f-d4c9-4d11-b742-7e4fa6f5fc3a')
                    
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
    envContent.tokenize('\n').each { line ->
        def keyValue = line.tokenize('=')
        if (keyValue.size() == 2) {
            env[keyValue[0].trim()] = keyValue[1].trim()
        }
    }
}