'use strict';

module.exports = formatPath;

const path = require('path')

function formatPath(path) {
  if(path && typeof path === 'string') {
    const sep = path.sep
    if(sep === '/') {
      return path
    }
    return path.replace(/\\/g, '/')
  }
  return path;
}
