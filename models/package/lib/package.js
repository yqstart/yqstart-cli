'use strict';

const { isObject } = require('@yqstart-cli/utils')
const pkgDir = require('pkg-dir').sync
const path = require('path')
// macos /win 路径兼容
const formatPath = require('@yqstart-cli/format-path')
class Package {
  constructor(options) {
    if(!options) {
      throw new Error('Package类的options参数不能为空!')
    }
    if(!isObject(options)) {
      throw new Error('Package类的options参数必须为对象!')
    }
    this.targetPath = options.targetPath
    this.packageName = options.packageName
    this.packVersion = options.packVersion
  }

  exists() {}

  install() {}

  update() {}

  getRootFilePath() {
    const dir = pkgDir(this.targetPath)
    if(dir) {
      const pkgFile = require(path.resolve(dir, 'package.json'))
      if(pkgFile && pkgFile.main) {
        return formatPath(path.resolve(dir, pkgFile.main))
      }
    }
    return null
  }

}

module.exports = Package;