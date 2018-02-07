'use strict';

// src/services/tarefas/hooks/hasmany.js
//
// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/hooks/readme.html

const defaults = {};




module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.hasmany = true;

    const data = hook.result.data
    const ids = [];
    for(var i in data)
    {
      if(ids.indexOf(data[i]._id) < 0)
        ids.push(data[i]._id)
    }

    return hook.app.service('times').find({
      query: { tarefa_id: {
        $in: ids
      } }
    }).then(u => {
      // console.log(u);
      for(var i in data)
      {
        var tempo = 0
        for(var x in u.data)
        {
          if(data[i]._id == u.data[x].tarefa_id)
          {
            var d1 = Date.parse(u.data[x].updatedAt)
            var d2 = Date.parse(u.data[x].createdAt)

            tempo =  +tempo + d1 - d2

            if(d1 == d2 && u.data[x].status == 'OPEN')
            {
              var d3 = new Date().getTime()


              tempo =  +tempo + d3 - d2

            }
          }
        }

        tempo = Math.floor(+tempo/1000)
        var estimativa = Math.floor(+data[i].tempo*3600)
        var porcentagem = Math.floor((tempo / estimativa) * 100)

        data[i].progress = {
          total:tempo,
          estimativa:estimativa,
          porcentagem
        }


      }
      hook.result.data = data

      // Always return the hook object or `undefined`
      return hook;
    });
  };
};
