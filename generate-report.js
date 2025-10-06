const reporter = require('cucumber-html-reporter');
const path = require('path');
const fs = require('fs');

const options = {
  theme: 'bootstrap',
  jsonFile: 'reports/cucumber_report.json', // Caminho onde o Cucumber salvará o JSON
  output: 'reports/cucumber_report.html', // Caminho para o HTML final
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: true,
  metadata: {
    "App Version": "0.1.0",
    "Test Environment": "STG",
    "Browser": "Chromium",
    "Platform": "Windows 10 / macOS",
    "Executed by": "QA Team"
  }
};

// Certifique-se de que a pasta 'reports' existe
if (!fs.existsSync(options.output.split('/')[0])) {
  fs.mkdirSync(options.output.split('/')[0]);
}

reporter.generate(options);