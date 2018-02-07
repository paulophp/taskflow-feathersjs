'use strict';

const adduser = require('./adduser');

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');

const auth = require('feathers-authentication').hooks;

exports.before = {
  all: [auth.verifyToken()],

  find: [],
  get: [],
  create: [adduser()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [
    hooks.populate('projeto', {
      service: 'projetos',
      field: 'projeto_id'
    }),
    hooks.populate('tarefa', {
      service: 'tarefas',
      field: 'tarefa_id'
    }),
    hooks.populate('usuario', {
      service: 'users',
      field: 'usuario_id'
    }),
    hooks.populate('cliente', {
      service: 'clientes',
      field: 'cliente_id'
    })
  ],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
