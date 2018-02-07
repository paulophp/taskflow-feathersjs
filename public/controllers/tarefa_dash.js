APP.controller('tarefas_dash', ['$scope','$routeParams', function($scope, $routeParams) {

  var tarefas = app.service('tarefas');

  $scope.params = $routeParams;

  $('select.form-control').first().focus()



  function list()
  {

    tarefas.find({ query: { status: {
      $in: ['WORKING']
    }, $limit:6, $sort: {  status: -1, createdAt: -1  } } })
    .then(function(d) {
      if(!$('#logs').is(':visible'))
        $('#dashboard').after('<iframe id="logs" src="http://52.39.31.33:3030/" width="100%" height="100%" frameborder="0"></iframe>')

      $scope.$apply(function () {
        $scope.list = d.data;
        console.log(d.data[0]);
      });
    }, function(reason) {
      console.log('Failed: ' + reason);
      auth()
      setTimeout(list,1000)
    });
  }
  list()

  moment.locale('pt-BR');
  $scope._moment = function(d){
    return moment(d).fromNow()
  }


  // EVENTOS IO
  tarefas.on('removed', list)
  tarefas.on('patched', list)
  tarefas.on('created', list)


  // Layout
  $('.sidebar').hide()
  $('.navbar').hide()
  $('.main').attr('class','col-sm-12')
  $('body').css('padding','0px')


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
