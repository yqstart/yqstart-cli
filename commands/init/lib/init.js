'use strict';

module.exports = init;

function init(projectName, cmdObj) {
  console.log('init', projectName, cmdObj.force, process.env.CLI_TARGET_PATH)
}
