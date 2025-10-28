pipeline {
  agent any

  tools {
    nodejs "node"
  }

  stages {
    stage('Clean Workspace') {
      steps {
        cleanWs()
      }
    }

    stage('Checkout') {
      steps {
        checkout scm
      }
    }

    stage('Install & Test') {
      steps {
        sh '''
          rm -rf playwright-report allure-results allure-report screenshots videos
          npm ci
          npx playwright install --with-deps
          npx playwright test --reporter=list
        '''
      }
    }

    stage('Generate Allure Report') {
      steps {
        sh '''
          npx allure generate allure-results --clean -o allure-report || true
        '''
      }
    }

    stage('Publish Reports') {
      steps {
        // Publish Playwright HTML report
        publishHTML(target: [
          reportDir: 'playwright-report',
          reportFiles: 'index.html',
          reportName: 'Playwright Report'
        ])

        // Publish Allure report in Jenkins
        allure([
          includeProperties: false,
          jdk: '',
          results: [[path: 'allure-results']],
          reportBuildPolicy: 'ALWAYS'
        ])
      }
    }
  }

  post {
    always {
      archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
      archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
    }
  }
}
