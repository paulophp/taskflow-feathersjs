'use strict';

const assert = require('assert');
const belongs = require('../../../../src/services/tarefas/hooks/belongs.js');

describe('tarefas belongs hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    belongs()(mockHook);

    assert.ok(mockHook.belongs);
  });
});
