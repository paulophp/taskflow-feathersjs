'use strict';

const assert = require('assert');
const hasmany = require('../../../../src/services/tarefas/hooks/hasmany.js');

describe('tarefas hasmany hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    hasmany()(mockHook);

    assert.ok(mockHook.hasmany);
  });
});
