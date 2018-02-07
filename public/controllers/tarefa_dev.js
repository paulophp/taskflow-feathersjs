APP.controller('tarefas_dev', ['$scope','$routeParams', function($scope, $routeParams) {

  var tarefas = app.service('tarefas')

  $scope.params = $routeParams;

  $scope.set_text = function(s){

    return s.substring(s.indexOf("\n"),s.length).replace("\n",'')
  }

  $scope.set_status = function(id, s, negar){

    $.blockUI()

    patch(id,s)

    function patch(id,s){

      tarefas.patch(id,{status:s, start:(s=='WORKING'?true:false)})
      .then(function(){
        //$.unblockUI()
      }, function(reason) {
        console.log('Failed: ' + reason);
        auth()
        setTimeout(patch,1000, id, s)
      })
    }

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
    list(null, 1)
  }

  function list(t, unblock)
  {


    // _user = app.get('user')
    if(typeof _user == 'undefined')
    {
      setTimeout(function () {
        // console.log(_user);
        list()
      },1000)
      return false
    }else{



      if(typeof _user == 'object' && _user.grupo != 'admin')
      {
        if(_user.grupo == 'dev')
        {
          console.log(_user.grupo, unblock,t && (t.usuario_id != _user._id && !unblock));
          if(t && (t.usuario_id != _user._id && !unblock)){
            return false
          }
        }
      }
    }


    tarefas.find({ query: {
      usuario_id:_user._id,
      status: filter,
      $limit:25, $sort: {  createdAt: -1  } } })
    .then(function(d) {
      $scope.$apply(function () {
        // console.log(d.data);
        prepare_screen()

        $scope.list = d.data;
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


  function prepare_screen() {

    $('.sidebar').remove()
    $('#dash').remove()
    //$('.navbar').hide()
    $('.main').attr('class','col-sm-12')
    $('body').css('padding-top','60px')
    $('body').prev('div').hide()
    $('body').show()
    $.unblockUI()
  }





  // EVENTOS IO
  tarefas.on('removed', list)
  tarefas.on('patched', function(t){ list(t) })

  tarefas.on('created', list)




}])
