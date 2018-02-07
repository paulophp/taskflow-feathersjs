'use strict';

const service = require('feathers-mongoose');
const projetos = require('./projetos-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: projetos,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/projetos', service(options));

  // Get our initialize service to that we can bind hooks
  const projetosService = app.service('/projetos');

  // Set up our before hooks
  projetosService.before(hooks.before);

  // Set up our after hooks
  projetosService.after(hooks.after);
};
