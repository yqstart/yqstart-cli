'use strict';

const Package = require('../lib/package');
const assert = require('assert').strict;

assert.strictEqual(new Package(), 'Hello from package');
console.info('package tests passed');
