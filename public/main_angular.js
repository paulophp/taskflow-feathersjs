var APP = angular.module('NgApp', ['ngRoute']) //, 'ngAnimate'
.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $routeProvider
      .when('/reports', {
        templateUrl: 'views/timelines/list.html',
        controller: 'timelines'
      })
      .when('/maintenance', {
        templateUrl: 'views/maintenance/panel.html',
        controller: 'maintenance'
      })
      .when('/add_projeto', {
        templateUrl: 'views/projetos/add.html',
        controller: 'projeto'
      })
      .when('/projetos', {
        templateUrl: 'views/projetos/list.html',
        controller: 'projeto'
      })
      .when('/add_tarefa', {
        templateUrl: 'views/tarefas/add.html',
        controller: 'tarefa_add'
      })
      .when('/tarefas', {
        templateUrl: 'views/tarefas/list.html',
        controller: 'tarefa'
      })
      .when('/dash', {
        templateUrl: 'views/tarefas/dash.html',
        controller: 'tarefas_dash'
      })
      .when('/minhas_tarefas', {
        templateUrl: 'views/tarefas/list_dev.html',
        controller: 'tarefas_dev'
      })
      .when('/usuarios', {
        templateUrl: 'views/usuarios/list.html',
        controller: 'usuarios'
      })
      .when('/usuario/:uid', {
        templateUrl: 'views/usuarios/edit.html',
        controller: 'usuarios'
      })
      .when('/tarefa/:id', {
        templateUrl: 'views/tarefas/edit.html',
        controller: 'tarefa_edit'
      })
      .when('/projeto/:id', {
        templateUrl: 'views/projetos/edit.html',
        controller: 'projeto_edit'
      })
      // .when('/', {redirectTo: '/tarefas'});

    //$locationProvider.html5Mode(true);
  }
])
.controller('MainCrtl', ['$rootScope', '$scope', '$route', '$routeParams', '$location',
  function($rootScope, $scope, $route, $routeParams, $location) {
    $scope.$route = $route;
    $scope.$location = $location;
    $scope.$routeParams = $routeParams;

    moment.locale('pt-BR');

    $scope._moment = function(d){
      return moment(d).fromNow()
    }

    $scope.left_menu = [
      {text:'Tarefas', link:'#/tarefas'},
      {text:'Projetos', link:'#/projetos'},
      {text:'Usuarios', link:'#/usuarios'},
      {text:'Reports', link:'#/reports'},
      {text:'Maint', link:'#/maintenance'}
    ]

    // console.log(_user, $location.$$path);
    function check_user_rout(){
      if(typeof _user == 'undefined')
      {
        setTimeout(function () {
          check_user_rout()
        },300)
      }else{

        $rootScope.$on("$locationChangeStart", function(event, next, current) {
          if($location.$$path != '/minhas_tarefas' && _user.grupo == 'dev')
          {
            window.location = '#/minhas_tarefas'
          }else{
            // $('.sidebar').show()
            $('.navbar').show()
            $('body').css('padding-top', '50px')
            // $('.main').attr('class','col-md-10 col-md-offset-2 main')

          }


        });


      }

    }
    check_user_rout()




    $scope.logout = function(){
      if(!confirm('Is this good bye?')) return

      app.logout()
      window.location = '/login.html'

    }


    $scope.confirm = function() {
      var n = function() { return Math.floor(Math.random(1,9)*10) }
      var x1 = n()
      var x2 = n()
      var x3 = x1 + x2
      // return true
      var x4 = prompt(x1+' + '+x2+' = ?')

      if(typeof x4 == 'object')
      {
        $.unblockUI()

        return false
      }
      return x4 == x3 ? true : $scope.confirm()

    }

    $scope.percent = function (n, max) {
      if(n.progress.total <= 0) return 0
      var t = Math.floor((n.progress.total / n.progress.estimativa) * 100)
      return t>100?(max?100:t):t

    }

    $scope.toH = function (n) {
        var sec_num = parseInt(n, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }
  }
])
