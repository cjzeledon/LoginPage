const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');

// app.use(express.static('public'));
// Decide if you need to use the static page and how it really works and what its purpose really is

app.get('/', function (request, respond){
  respond.render('login');
});

app.get('/welcome', function(request, respond){
  respond.render('welcome');
});

app.listen(3000, function(){
  console.log('Node.js Rule!');
})
