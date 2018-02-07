APP.controller('usuarios', ['$scope','$routeParams', function($scope, $routeParams) {

  var users = app.service('users');

  $scope.params = $routeParams;


  if($routeParams.uid)
  {
      users.get($routeParams.uid).then(function(u){
        $scope.$apply(function () {

          $scope.p = u
        });
      })
  }

  $('.form-group input').first().focus()

  $scope.edit = function(id){

    if($scope.p != undefined)
    {
      users.patch(id, $scope.p).then(function(){

        window.location = '#/usuarios'
      })
    }
  }

  $scope.reset = function(id){
    var pass = prompt('Enter new pass')
    if(pass != undefined)
    {
      // alert(pass)
      users.patch(id, {password:pass}).then(function(u){

        // window.location = '#/usuarios'
        console.log(u);
      })
    }
  }


  $scope.del = function(id){

    if(confirm('soft Delete this user?'))
    {
      users.patch(id,{status:0})
      .then(function(){

        list()
      })
    }
  }

  function list()
  {

    var data = users.find({ query: {
      status: {
    $nin: ['0']
  },
       $limit:25, $sort: { updatedAt: -1 } } })

    data.then(function(d) {
      $scope.$apply(function () {

        console.log(d.data);
        $scope.list = d.data;
      });
    }, function(reason) {
      console.log('Failed: ' + reason);
      auth()
      setTimeout(get,1000)
    })
  }
  list()


}])
