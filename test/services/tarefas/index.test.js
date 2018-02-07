'use strict';

const assert = require('assert');
const app = require('../../../src/app');

describe('tarefas service', function() {
  it('registered the tarefas service', () => {
    assert.ok(app.service('tarefas'));
  });
});
