'use strict';

const assert = require('assert');
const adduser = require('../../../../src/services/message/hooks/adduser.js');

describe('message adduser hook', function() {
  it('hook can be used', function() {
    const mockHook = {
      type: 'before',
      app: {},
      params: {},
      result: {},
      data: {}
    };

    adduser()(mockHook);

    assert.ok(mockHook.adduser);
  });
});
