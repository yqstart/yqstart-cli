'use strict';

const Package = require('@yqstart-cli/package')

module.exports = exec;

function exec() {
  console.log(process.env.CLI_TARGET_PATH, 'process.env.CLI_TARGET_PATH')
  const pkg = new Package()
}
