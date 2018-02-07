APP.controller('projeto_edit', ['$scope','$routeParams', function($scope, $routeParams) {

  var projetos = app.service('projetos')
  var time = app.service('times')



  $scope.params = $routeParams;


function get(){

  if($routeParams.id)
  {
    projetos.get($routeParams.id).then(function(u){
      $scope.$apply(function () {
        $scope.p = u

        time.find({
          query: { projeto_id: u._id,
            createdAt:{
              $gt: new Date(new Date().setHours(0,0,0,0))
            }
          }
        }).then(u => {
          console.log(u);
        }, function(reason) {
          console.log('Failed: ' + reason);
          auth()
          setTimeout(get,1000)
        })

      });
    })
  }
}
get()



  $scope.edit = function(id){

      projetos.patch(id, $scope.p)
      .then(function(){

        window.location = '#/projetos'
      })

  }

  //Cli
  var cli = app.service('clientes');
  cli.find({ query: {$limit:25, $sort: { updatedAt: -1 } } })
  .then(function(d) {
    $scope.$apply(function () {
      $scope.clientes_list = d.data;
    });
  }, function(reason) {
    // alert('Failed: ' + reason);
  });



}])
