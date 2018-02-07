'use strict';

//THIS HOOK SHOULD ADD USER AND PROJECT ID
const defaults = {};


module.exports = function(options) {
  options = Object.assign({}, defaults, options);

  return function(hook) {
    hook.adduser = true;

    // console.log('user',hook.params  );
    // const user = hook.params.user;
    // The actual message text
    const tarefa_id = hook.data.tarefa_id
    // Override the original data

    //Add projeto
    return hook.app.service('tarefas').get(tarefa_id).then(function(t){
      //console.log(t);
      const projeto_id = t.projeto_id
      const cliente_id = t.cliente_id
      const usuario_id = t.usuario_id

      hook.data = {
        tarefa_id:tarefa_id,
        cliente_id:cliente_id,
        projeto_id:projeto_id,
        // Set the user id
        usuario_id: usuario_id,
        // Add the current time via `getTime`
        createdAt: new Date().getTime()


      };
      // console.log(hook.data);
      return hook;


    })


  };
};
