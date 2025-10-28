pipeline {
  agent any

  tools {
    nodejs "node"  // Make sure NodeJS tool is configured in Jenkins (Manage Jenkins > Tools)
  }

  stages {
    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install Dependencies') {
      steps {
        sh 'npm ci'
        sh 'npx playwright install --with-deps'
      }
    }

    stage('Run Tests') {
      steps {
        // Run Playwright tests in headless mode
        sh 'npx playwright test --reporter=list'
      }
    }

    stage('Publish Report') {
      steps {
        // Generate HTML report
        sh 'npx playwright show-report || true'
        publishHTML(target: [
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Test Report'
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      junit 'playwright-report/*.xml'
    }
  }
}
