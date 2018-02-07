'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('time service', function() {
  it('registered the times service', () => {
    assert.ok(app.service('times'));
  });
});
