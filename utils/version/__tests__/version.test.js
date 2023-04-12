'use strict';

const version = require('..');
const assert = require('assert').strict;

assert.strictEqual(version(), 'Hello from version');
console.info('version tests passed');
