const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static('public'));
// Decide if you need to use the static page and how it really works and what its purpose really is

// {} are arrays and [] are objects
const users = [
  {username: 'ayanna', password:'minecraft', logins: 0},
  {username: 'melania', password:'talks', logins: 0},
  {username: 'sophia', password:'runs', logins: 0},
];

// This is to create a login web page at the root path.
app.get('/', function (request, respond){
  respond.render('login');
});

// This creates a welcome page after the login is successful.
app.get('/welcome', function(request, respond){
  respond.render('welcome');
});

// This creates a port 3000 so that the app can "listen" in to. Basically grants access?
app.listen(3000, function(){
  console.log('Node.js Rule!');
})
