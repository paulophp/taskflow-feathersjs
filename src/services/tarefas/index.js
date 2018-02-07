'use strict';

const service = require('feathers-mongoose');
const tarefas = require('./tarefas-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: tarefas,
    paginate: {
      default: 5,
      max: 500
    }
  };

  // Initialize our service with any options it requires
  app.use('/tarefas', service(options));

  // Get our initialize service to that we can bind hooks
  const tarefasService = app.service('/tarefas');

  // Set up our before hooks
  tarefasService.before(hooks.before);

  // Set up our after hooks
  tarefasService.after(hooks.after);
};
