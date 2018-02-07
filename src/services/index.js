'use strict';
const maintenance = require('./maintenance');
const commits = require('./commits');
const time = require('./time');
const clientes = require('./clientes');
const tarefas = require('./tarefas');
const projetos = require('./projetos');
const message = require('./message');
const authentication = require('./authentication');
const user = require('./user');
const mongoose = require('mongoose');
module.exports = function() {
  const app = this;

  mongoose.connect(app.get('mongodb'));
  mongoose.Promise = global.Promise;

  app.configure(authentication);
  app.configure(user);
  app.configure(message);
  app.configure(projetos);
  app.configure(tarefas);
  app.configure(clientes);
  app.configure(time);
  app.configure(commits);
  app.configure(maintenance);
};
