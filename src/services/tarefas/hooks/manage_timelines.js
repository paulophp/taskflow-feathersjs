'use strict';

// src/services/tarefas/hooks/manage_timelines.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};

module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.manageTimelines = true;
    var data = hook.data
    // console.log('data',hook);
    // console.log(data, hook.id);
    if(data.status == 'WORKING' && data.start)
    {
      return hook.app.service('tarefas').get(hook.id).then(t =>{
        if(t.status == 'PAUSED' || t.status == 'NEW')
        {
          var time = {
            tarefa_id:hook.id
          }
          hook.app.service('times').create(time).then(t =>{
            // console.log('create');
            // console.log('create time ',t);
            hook.data.start = false
            return hook

          }, function(reason) {
            console.log('Failed CREATE: ' + reason);
          })

        }
      })

    }

    if(data.status == 'PAUSED')
    {

      return hook.app.service('times').find({ query: { tarefa_id:hook.id, status:'OPEN' }}).then(t =>{
        if(t.data.length > 0)
        {
          // console.log('close');
          hook.app.service('times').patch(t.data[0]._id, {
            status:'CLOSED',
            updatedAt: new Date().getTime()
          })
          .then(function(t){

            return hook
            // console.log('forever closed time line :: ',t);
            // hook.app.service('tarefas').find({ query: { _id:hook.id }})
            // .then(d => {
            //   var t = d.data[0]
            //
            //   hook.app.service('tarefas').patch(hook.id, {tempo_gasto:t.progress.total})
            //   .then(t => {
            //     // console.log(t);
            //   }, function(reason) {
            //     //  console.log('Failed CREATE: ' + reason);
            //   })
            // })
          }, function(reason) {
             console.log('Failed: ' + reason);
          })
        }
      })
    }

  };
};
