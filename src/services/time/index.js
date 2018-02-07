'use strict';

const service = require('feathers-mongoose');
const time = require('./time-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: time,
    paginate: {
      default: 500,
      max: 500
    }
  };

  // Initialize our service with any options it requires
  app.use('/times', service(options));

  // Get our initialize service to that we can bind hooks
  const timeService = app.service('/times');

  // Set up our before hooks
  timeService.before(hooks.before);

  // Set up our after hooks
  timeService.after(hooks.after);
};
