APP.controller('maintenance', ['$scope','$routeParams', function($scope, $routeParams) {

  var maint = app.service('maintenances')

  maint.on('patched', function(r){
      list()
  })

  $scope.params = $routeParams;

  $scope.cmd = function(s){
    if(!confirm('Maintenance action['+s+'], be careful!')) return false
    $.blockUI()

    maint.create({tipo:s, text:'Executando...'}).then(r=>{
      // console.log(r);

      if(s=='reset')
      {



        setTimeout(function(){

          location.reload()
        },5000)
      }else {
        $.unblockUI()

      }

      list()


    })
  }

  $scope.del = function(id, s){
    //var s = prompt('hue')
    if(confirm())
      tarefas.remove(id)
  }

  function list()
  {

    maint.find({ query: {

      $limit:25, $sort: {  createdAt: -1  } } })
    .then(function(d) {

      $scope.$apply(function () {
        console.log(d.data);
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
