'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('commits service', function() {
  it('registered the commits service', () => {
    assert.ok(app.service('commits'));
  });
});
