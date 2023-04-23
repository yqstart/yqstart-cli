'use strict';

const Package = require('@yqstart-cli/package')
const log = require('@yqstart-cli/log')

module.exports = exec;

const SETTINGS = {
  init: '@yqstart-cli/init'
}

function exec() {
  const targetPath = process.env.CLI_TARGET_PATH
  const homePath = process.env.CLI_HOME_PATH
  log.verbose('targetPath', targetPath)
  log.verbose('homePath', homePath)
  const [cmdObj] = Array.from(arguments).slice(-1)
  const packageName = SETTINGS[cmdObj.name()]
  const packageVersion = 'latest'
  const pkg = new Package({
    targetPath,
    packageName,
    packageVersion
  })
  console.log(pkg.getRootFilePath())
}
