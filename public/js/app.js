
window.addEventListener('load', function() {
  var idToken;
  var expiresAt;

  var webAuth = new auth0.WebAuth({
    domain: 'tommullen.auth0.com',
    clientID: 'gMpCbQ05redfJaE8CC9p0lbJ31fH5N31',
    responseType: 'token id_token',
    scope: 'openid',
    redirectUri: window.location.href
  });

  var loginBtn = document.getElementById('btn-login');

  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    webAuth.authorize();
  });

});

