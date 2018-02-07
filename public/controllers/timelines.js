APP.controller('timelines', ['$scope','$routeParams', function($scope, $routeParams) {

  var times = app.service('times');

  // tarefas.on('patched', function(t){
  //
  //   if(t.status == 'PAUSED')
  //     list()
  // })

  $scope.params = $routeParams;

  // $scope.add = function(){
  //
  //     projetos.create($scope.p)
  //     .then(function(){
  //
  //       window.location = '#/projetos'
  //     })
  //
  // }
  //
  // $scope.del = function(id){
  //
  //   if(confirm('Deletar forever?'))
  //   {
  //     //projetos.remove(id)
  //     alert('implementar soft delete')
  //     list()
  //   }
  // }

  $scope.tempo = function(d1,d2, r){
    d1 =  Date.parse(d1);
    d2 =  Date.parse(d2);
    var tempo = d1 - d2
    tempo = Math.floor(+tempo/1000)
    if(r) return tempo
    return this.toH(tempo)
  }

  $scope.del = function(id){
    if(!confirm('Warning! Permanet delete!')) return false
    
    times.remove(id).then(t => {
      list()
    })
  }

  function list()
  {

    times.find({ query: {
      cliente_id: {
        $gt: 0
      },
      $limit:300, $sort: { updatedAt: -1 } } })
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
