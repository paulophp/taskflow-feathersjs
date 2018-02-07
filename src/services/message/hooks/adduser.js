'use strict';

// src/services/message/hooks/process.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

module.exports = function(options) {
  return function(hook) {
    // The authenticated user
    const user = hook.params.user;
    // The actual message text
    const text = hook.data.text

    // Override the original data
    hook.data = {
      text,
      // Set the user id
      user_id: user._id,
      // Add the current time via `getTime`
      createdAt: new Date().getTime()
    };
  };
};
