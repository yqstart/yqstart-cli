'use strict';

module.exports = {
  getNpmSemverVersions
};

const axios = require('axios')
const urlJoin = require('url-join')
const semver = require('semver')
function getNpmInfo(npmName, registry) {
  if(!npmName) {
    return null
  }
  const reg = registry || getDefaultRegistry()
  const npmUrl = urlJoin(reg, npmName)
  return axios.get(npmUrl).then(res => {
    if(res.status === 200) {
      return res.data
    }
    return null
  }).catch(err => {
    return Promise.reject(err)
  })
}

function getDefaultRegistry(isOriginal = true) {
  return isOriginal ? 'https://registry.npmjs.org' : ' https://registry.npmmirror.com'
}

async function getNpmVersion(npmName, registry) {
  const data = await getNpmInfo(npmName, registry)
  if(data) {
    return Object.keys(data.versions)
  } else {
    return []
  }
}

function getSemverVersions(currentVersion, versions){
  return versions.filter(version => semver.satisfies(version, `^${currentVersion}`)).sort((a,b) => semver.gt(b, a))
}

async function getNpmSemverVersions(npmName, currentVersion, registry){
  const versions = await getNpmVersion(npmName, registry)
  const newVersions = getSemverVersions(currentVersion, versions)
  if(newVersions && newVersions.length) return newVersions[0]
}