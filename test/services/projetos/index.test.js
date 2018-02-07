'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('projetos service', function() {
  it('registered the projetos service', () => {
    assert.ok(app.service('projetos'));
  });
});
