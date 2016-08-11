$(document).ready(function() {
    init_state();

    $('#login-btn').click(showLoginForm);
    $('#signup-btn').click(showSignupForm);

    $('#login-form').submit(function(e) {
      e.preventDefault();
      login();
    });
    $('#signup-form').submit(signup);
});

var init_state = function() {
    $('#login-form').hide();
    $('#signup-form').hide();
};

var showLoginForm = function() {
    $('#login-form').show();
    $('#signup-form').hide();
};

var showSignupForm = function() {
    $('#signup-form').show();
    $('#login-form').hide();
};

var login = function() {

  var data = {};
  data.username = $('#email-login').val();
  data.password = $('#password-login').val();

  $.ajax({
    type : 'POST',
    data : JSON.stringify(data),
    contentType : 'application/json',
    url : '/login',
    success : function(data) {
      console.log(data);
    },
    error: function() {
      console.log('Server Error');
    }
  });
};

var signup = function() {

  var data = {};
  data.username = $('#email').val();
  data.password = $('#password').val();
  data.netId = $('#netid').val();
  data.caspass = $('#cas-password').val();

  $.ajax({
    type : 'POST',
    data : JSON.stringify(data),
    contentType : 'application/json',
    url : '/signup',
    success : function(data) {
      console.log(data);
    },
    error: function() {
      console.log('Server Error');
    }
  });
};
