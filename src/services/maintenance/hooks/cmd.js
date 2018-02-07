'use strict';

// src/services/maintenances/hooks/cmd.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.cmd = true;
    var cmd=require('node-cmd');

    if(hook.data.tipo == 'up')
    {

      cmd.get(
          'svn up',
          function(data){
              hook.app.service('maintenances').patch(hook.result._id,{text:data})
              console.log('Maintenance cmd: ',data)
          }
      );
    }


    if(hook.data.tipo == 'reset')
    {
      if(!hook.params.user.syspid) return false
      hook.app.service('maintenances').patch(hook.result._id,{text:'Done.'}).then(r=>{
        cmd.get(
          'forever restart '+hook.params.user.syspid,
          function(data){
            console.log('Maintenance cmd: ',data)
          }
        );

      })
    }
  };
};
