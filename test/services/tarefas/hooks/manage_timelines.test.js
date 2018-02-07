'use strict';

const assert = require('assert');
const manageTimelines = require('../../../../src/services/tarefas/hooks/manage_timelines.js');

describe('tarefas manageTimelines hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'after',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    manageTimelines()(mockHook);

    assert.ok(mockHook.manageTimelines);
  });
});
