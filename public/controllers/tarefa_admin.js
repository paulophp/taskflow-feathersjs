APP.controller('tarefa', ['$scope','$routeParams', function($scope, $routeParams) {

  var tarefas = app.service('tarefas')

  $scope.params = $routeParams;

  $scope.set_status = function(id, s, negar){

    $.blockUI()

    patch(id,s)

    function patch(id,s){

      tarefas.patch(id,{status:s, start:(s=='WORKING'?true:false)})
      .then(function(){
        // $.unblockUI()
      }, function(reason) {
        console.log('Failed: ' + reason);
        auth()
        setTimeout(patch,1000, id, s)
      })
    }

  }

  $scope.del = function(id, s){
    //var s = prompt('hue')
    if(confirm())
      tarefas.remove(id)
  }


  var filter = {
    $nin: ['CLOSED']
  }
  $scope.filter = function(s)
  {
    $.blockUI()
    if(s=='OPEN')
    {
      filter = {
        $nin: ['CLOSED']
      }
    }else{
      filter = {
        $in: ['CLOSED']
      }
    }
    list()
  }

  function list()
  {

    tarefas.find({ query: {
      status: filter,
      $limit:25, $sort: {  createdAt: -1  } } })
    .then(function(d) {

      $scope.$apply(function () {
        console.log(d.data);
        $scope.list = d.data;

        $.unblockUI()


      });
    }, function(reason) {
      console.log('Failed: ' + reason);
      auth()
      setTimeout(list,1000)
    });
  }
  list()



  //Time
  var time = app.service('times');







  // EVENTOS IO
  tarefas.on('removed', list)
  tarefas.on('patched', list)
  tarefas.on('created', list)

  // TIMER
  setInterval(function(){
    var d = $scope.list
    for(i in d)
    {
      if(d[i].status == 'WORKING')
      {
        // console.log($scope.list[i].progress.total);
        $scope.$apply(function () {
          // $scope.usuarios_list = d.data;
          $scope.list[i].progress.total++
        });
      }
    }
  },1000)

}])
