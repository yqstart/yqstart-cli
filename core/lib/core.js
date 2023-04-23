'use strict';

module.exports = core;

const path = require('path')
const commander = require('commander')
const semver = require('semver')
const userHome = require('user-home')
const pathExists = require('path-exists').sync
const colors = require('colors/safe')
const pkg = require('../package.json')
const constant = require('./const')
const log = require('@yqstart-cli/log')

const program = new commander.Command
async function core() {
  try {
    checkPkgVersion()
    checkNodeVersion()
    checkRoot()
    checkUserHome()
    // checkInputArgs()
    checkEnv()
    await checkGlobalUpdate()
    registerCommand()
    // log.verbose('debug', 'test')
  }catch (err) {
    log.error(err.message)
  }
}

function checkPkgVersion() {
  log.notice('cli', pkg.version)
}

function checkNodeVersion() {
  // 获取当前node process.version
  const currentVersion = process.version
  // 最低版本号
  const lowestVersion = constant.LOWEST_NODE_VERSION

  if(!semver.gte(currentVersion, lowestVersion)) {
    throw new Error(colors.red(`yqstart-cli 需要安装 v${lowestVersion} 以上版本的node.js`))
  }
}

function checkRoot() {
  // process.geteuid()
  const rootCheck = require('root-check')
  rootCheck()  // root用户降级
}

function checkUserHome() {
  if(!userHome || !pathExists(userHome)) {
    throw new Error(colors.red('当前登录用户祝目录不存在!'))
  }
}

function checkInputArgs() {
  const minimist = require('minimist');
  const args = minimist(process.argv.slice(2))
  checkArgs(args)
}

function checkArgs(args) {
  if(args.debug) {
    process.env.LOG_LEVEL = 'verbose'
  }else {
    process.env.LOG_LEVEL = 'info'
  }
  log.level = process.env.LOG_LEVEL
}

let config = {}
function checkEnv() {
  const dotenv = require('dotenv')
  const dotenvPath = path.resolve(userHome, '.env')
  if(pathExists(dotenvPath)) {
    config = dotenv.config({
      path: dotenvPath
    });
  }
  createDefaultConfig()
  log.verbose('环境变量', process.env.CLI_HOME)
}

function createDefaultConfig() {
  if(process.env.CLI_HOME) {
    process.env.CLI_HOME_PATH = path.join(userHome, process.env.CLI_HOME)
  } else {
    process.env.CLI_HOME_PATH = path.join(userHome, constant.DEFAULT_CLI_HOME)
  }
}

async function checkGlobalUpdate() {
  const currentVersion = pkg.version
  const npmName = pkg.name
  const { getNpmSemverVersions } = require('@yqstart-cli/version')
  const newVersion = await getNpmSemverVersions(npmName, currentVersion)
  if(newVersion && semver.gt(newVersion, currentVersion)) {
    log.warn('更新提示', colors.yellow(`当前版本: ${currentVersion}, 最新版本: ${newVersion}\n更新命令: npm install -g ${npmName}`))
  }
}

function registerCommand() {
  program
      .name(Object.keys(pkg.bin)[0])
      .usage('<command> [options]')
      .version(pkg.version)
      .option('-d, --debug', '是否开启调试模式', false)

  program
      .command('init [projectName]')
      .option('-f, --force', '是否强制初始化项目')
      .action((projectName, cmdObj) => {
        console.log('init', projectName, cmdObj.force)
      })
  program.on('option:debug', function () {
    if(program.debug){
      process.env.LOG_LEVEL = 'verbose'
    } else {
      process.env.LOG_LEVEL = 'info'
    }
    log.level = process.env.LOG_LEVEL
  })

  program.on('command:*', function (obj){
    const availableCommands = program.commands.map(cmd => cmd.name())
    console.log(colors.red(`未知命令: ${ obj[0] }`))
    if(availableCommands.length) {
      console.log(colors.red(`可用命令: ${ availableCommands.join(',') }`))
    }
  })

  if(program.args && program.args.length < 1) {
    program.outputHelp()
  }

  program.parse(process.argv)
}