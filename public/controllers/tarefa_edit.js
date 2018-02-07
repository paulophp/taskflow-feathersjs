APP.controller('tarefa_edit', ['$scope','$routeParams', function($scope, $routeParams) {

  var tarefas = app.service('tarefas')



  $scope.params = $routeParams;



  if($routeParams.id)
  {
      tarefas.get($routeParams.id).then(function(u){
        $scope.$apply(function () {
          console.log(u);
          $scope.novo = u

          // Projetos
          var projetos = app.service('projetos');
          projetos.find({ query: {$limit:25, $sort: { updatedAt: -1 } } })
          .then(function(d) {
            $scope.$apply(function () {
              $scope.projetos_list = d.data;
              $scope.novo.projeto_id =   $scope.novo.projeto_id

              //Usuarios
              var usuarios = app.service('users');
              usuarios.find({ query: {
                status: {
                  $nin: ['0']
                },
                $limit:25, $sort: { updatedAt: -1 } } })
                .then(function(d) {
                $scope.$apply(function () {
                  $scope.usuarios_list = d.data;
                  $scope.novo.usuario_id = $scope.novo.usuario_id

                  $(function() {
                    $('input.form-control:eq(1)').focus()
                  })



                });
              }, function(reason) {
                 console.log('Failed: ' + reason);
              });

            });
          }, function(reason) {
            // alert('Failed: ' + reason);
          });

        });
      })
  }






  $scope.set_title = function()
  {
    $scope.novo.nome = $scope.novo.text.split("\n")[0];
  }

  var set_cliente = function(proj)
  {
    for(var i in $scope.projetos_list)
    {
      if(proj == $scope.projetos_list[i]._id)
        return $scope.projetos_list[i].cliente._id
    }
  }

  $scope.save = function(){
      $scope.novo.cliente_id = set_cliente($scope.novo.projeto_id)

      tarefas.patch($routeParams.id, $scope.novo)
      .then(function(){

        window.location = '#/tarefas'
      })

  }





}])
