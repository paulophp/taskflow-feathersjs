'use strict';
const hasmany = require('./hasmany');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [auth.verifyToken()],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [hasmany(),
    hooks.populate('cliente', {
      service: 'clientes',
      field: 'cliente_id'
    })],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
