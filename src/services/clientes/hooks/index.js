'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const auth = require('feathers-authentication').hooks;

exports.before = {
  // all: [auth.verifyToken()],

  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
