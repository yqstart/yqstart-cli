'use strict';

module.exports = {
  getNpmInfo
};

const axios = require('axios')
const urlJoin = require('url-join')
const semver = require('semver')
function getNpmInfo(npmName, registry) {
  console.log('getNpmInfo')
  if(!npmName) {
    return null
  }
}
