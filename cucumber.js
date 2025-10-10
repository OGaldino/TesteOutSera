// cucumber.js
module.exports = {
  default: `--require-module ts-node/register --require src/steps/**/*.ts src/features/**/*.feature --format json:reports/cucumber_report.json`,
  // Note que 'src/features/**/*.feature' foi adicionado.
};