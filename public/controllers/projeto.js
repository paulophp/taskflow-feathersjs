APP.controller('projeto', ['$scope','$routeParams', function($scope, $routeParams) {

  var projetos = app.service('projetos');
  var cli = app.service('clientes');
  cli.find({ query: {$limit:25, $sort: { updatedAt: -1 } } })
  .then(function(d) {

    $scope.$apply(function () {
      $scope.clientes_list = d.data;
      // $scope.p.cliente_id = $scope.clientes_list[0]._id

    });
  });


  var tarefas = app.service('tarefas');

  tarefas.on('patched', function(t){

    if(t.status == 'PAUSED')
      list()
  })

  $scope.params = $routeParams;

  $scope.add = function(){

      projetos.create($scope.p)
      .then(function(){

        window.location = '#/projetos'
      })

  }

  $scope.del = function(id){

    if(confirm('Deletar forever?'))
    {
      //projetos.remove(id)
      alert('implementar soft delete')
      list()
    }
  }



  function list()
  {

    projetos.find({ query: {$limit:25, $sort: { updatedAt: -1 } } })
    .then(function(d) {
      console.log(d);
      $scope.$apply(function () {
        $scope.list = d.data;
      });
    },  function(reason) {
      console.log('Failed: ' + reason);
      auth()
      setTimeout(list,1000)
    })
  }
  list()

}])
