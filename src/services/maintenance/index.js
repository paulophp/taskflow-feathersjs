'use strict';

const service = require('feathers-mongoose');
const maintenance = require('./maintenance-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: maintenance,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/maintenances', service(options));

  // Get our initialize service to that we can bind hooks
  const maintenanceService = app.service('/maintenances');

  // Set up our before hooks
  maintenanceService.before(hooks.before);

  // Set up our after hooks
  maintenanceService.after(hooks.after);
};
