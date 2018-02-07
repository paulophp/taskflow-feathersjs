'use strict';

const manageTimelines = require('./manage_timelines');

const hasmany = require('./hasmany');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [auth.verifyToken()],
  find: [],
  get: [],
  create: [],
  update: [auth.restrictToOwner({ ownerField: 'usuario_id' })],
  patch: [
    //auth.restrictToOwner({ ownerField: 'usuario_id' }),
    manageTimelines()
  ],
  remove: [auth.restrictToOwner({ ownerField: 'usuario_id' })]
};

exports.after = {
  all: [],
  find: [hasmany(), hooks.populate('projeto', {
    service: 'projetos',
    field: 'projeto_id'
  }),
  hooks.populate('usuario', {
    service: 'users',
    field: 'usuario_id'
  })],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
