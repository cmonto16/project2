
// window.addEventListener('load', function() {
//   var idToken;
//   var expiresAt;

//   var webAuth = new auth0.WebAuth({
//     domain: 'tommullen.auth0.com',
//     clientID: 'gMpCbQ05redfJaE8CC9p0lbJ31fH5N31',
//     responseType: 'token id_token',
//     scope: 'openid',
//     redirectUri: window.location.href
//   });

//   var loginBtn = document.getElementById('btn-login');

//   loginBtn.addEventListener('click', function(e) {
//     e.preventDefault();
//     webAuth.authorize();
//   });

//   function handleAuthentication() {
//     webAuth.parseHash(function(err, authResult) {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         window.location.hash = '';
//         localLogin(authResult);
//         loginBtn.style.display = 'none';
//         homeView.style.display = 'inline-block';
//       } else if (err) {
//         homeView.style.display = 'inline-block';
//         console.log(err);
//         alert(
//           'Error: ' + err.error + '. Check the console for further details.'
//         );
//       }
//       displayButtons();
//     });
//   }

//   function localLogin(authResult) {
//     // Set isLoggedIn flag in localStorage
//     localStorage.setItem('isLoggedIn', 'true');
//     // Set the time that the access token will expire at
//     expiresAt = JSON.stringify(
//       authResult.expiresIn * 1000 + new Date().getTime()
//     );
//     accessToken = authResult.accessToken;
//     console.log(accessToken)
//     idToken = authResult.idToken;
//   }

//   function renewTokens() {
//     webAuth.checkSession({}, (err, authResult) => {
//       if (authResult && authResult.accessToken && authResult.idToken) {
//         localLogin(authResult);
//       } else if (err) {
//         alert(
//             'Could not get a new token '  + err.error + ':' + err.error_description + '.'
//         );
//         logout();
//       }
//       displayButtons();
//     });
//   }

//   function logout() {
//     // Remove isLoggedIn flag from localStorage
//     localStorage.removeItem('isLoggedIn');
//     // Remove tokens and expiry time
//     accessToken = '';
//     idToken = '';
//     expiresAt = 0;
//     displayButtons();
//   }

//   function isAuthenticated() {
//     // Check whether the current time is past the
//     // Access Token's expiry time
//     var expiration = parseInt(expiresAt) || 0;
//     return localStorage.getItem('isLoggedIn') === 'true' && new Date().getTime() < expiration;
//   }

// });

// // node stuff
// var session = require('express-session');

// // config express-session
// var sess = {
//   secret: 'CHANGE THIS TO A RANDOM SECRET',
//   cookie: {},
//   resave: false,
//   saveUninitialized: true
// };

// if (app.get('env') === 'production') {
//   sess.cookie.secure = true; // serve secure cookies, requires https
// }

// app.use(session(sess));