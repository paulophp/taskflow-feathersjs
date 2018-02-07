APP.controller('tarefa_add', ['$scope','$routeParams', function($scope, $routeParams) {

  var tarefas = app.service('tarefas')



  $scope.params = $routeParams;



    //Projetos
    var projetos = app.service('projetos');
    projetos.find({ query: {$limit:25, $sort: { updatedAt: -1 } } })
    .then(function(d) {
      $scope.$apply(function () {
        $scope.projetos_list = d.data;
        $scope.novo.projeto_id =   $scope.projetos_list[0]._id
        console.log(d.data);
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
            $scope.novo.usuario_id = $scope.usuarios_list[0]._id
            $scope.novo.tempo = 1

            $(function() {
              $('select.form-control:eq(1)').focus()
            })

          });
        }, function(reason) {
           console.log('Failed: ' + reason);
        });

      });
    }, function(reason) {
      // alert('Failed: ' + reason);
    });






  var set_cliente = function(proj)
  {
    for(var i in $scope.projetos_list)
    {
      if(proj == $scope.projetos_list[i]._id)
        return $scope.projetos_list[i].cliente._id
    }
  }

  $scope.set_title = function()
  {
    $scope.novo.nome = $scope.novo.text.split("\n")[0];
  }

  $scope.novo = {}
  $scope.novo.nome = 'Nova Tarefa'

  $scope.add = function(){
    if($scope.novo.text != undefined)
    {
      $scope.novo.cliente_id = set_cliente($scope.novo.projeto_id)
      tarefas.create($scope.novo)
      window.location = '#/tarefas'
    }
  }





}])
