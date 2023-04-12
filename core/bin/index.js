#! /usr/bin/env node

const importLocal = require('import-local')

if(importLocal(__filename)) {
    require('npmlog').info('cli', 'yqstart-cli local')
} else {
    require('../lib/core')(process.argv.slice(2))
}