'use strict';

const service = require('feathers-mongoose');
const commits = require('./commits-model');
const hooks = require('./hooks');

module.exports = function() {
  const app = this;

  const options = {
    Model: commits,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/commits', service(options));

  // Get our initialize service to that we can bind hooks
  const commitsService = app.service('/commits');

  // Set up our before hooks
  commitsService.before(hooks.before);

  // Set up our after hooks
  commitsService.after(hooks.after);
};
