//FORA DO angular
var socket = io();
// Create a client side Feathers application that uses the socket
// for connecting to services

var app = feathers();
app
.configure(feathers.socketio(socket))
.configure(feathers.hooks())
.configure(feathers.authentication({ storage: window.localStorage }));

var _user

function auth()
{
  app.authenticate()
  .then(function(result){
    _user = app.get('user')
    if(_user.email == '1@1')
      console.log(_user._id);
    // console.log(_user);
    $('#user_name').html(_user.email)

    if(_user.grupo == 'admin' && $('.navbar-nav li').length == 2)
    {
      $('body').prev('div').remove()
      setTimeout(function() {
        $('body').prev('div').remove()

      }, 1110);
      $('body').show()
      var menu = $('.nav-sidebar').html()
      $('.navbar-nav').prepend(menu)

      $('a').click(function(){
        // FIX MOBILE MENU
        $('#navbar').removeClass('in')
      })


    }

    if(_user.grupo == 'dev')
    {
      window.location = '#/minhas_tarefas'
    }
  }).catch(function(error){
    // console.error('Error authenticating!', error);
    window.location = '/login.html'
  });
}
auth()


socket.io.engine.on('upgrade', function(transport) {
  console.log('transport changed');
  auth();
});



$(function(){
  $('ul.nav-sidebar > li').first().addClass('active')

  $('ul.nav-sidebar li a').click(function(){
    $('ul.nav-sidebar > li').removeClass('active')
    $(this).parent('li').addClass('active')
  })

  $.blockUI.defaults.css.border = '0px';
  $.blockUI.defaults.css.backgroundColor = 'none';
  $.blockUI.defaults.message = '<img src="/imgs/load.gif" alt="" />';

  $('body').before('<div style="top:40px; left:45%; position:absolute"> <img src="/imgs/load0.gif" alt="" /> </div>');






})
