'use strict';

const exec = require('../lib/exec');
const assert = require('assert').strict;

assert.strictEqual(exec(), 'Hello from exec');
console.info('exec tests passed');
