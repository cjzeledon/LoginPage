const express = require('express');
const mustache = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.set('views', './views');
app.set('view engine', 'mustache');

app.listen(3002, function(){
  console.log('Node.js Rule!');
})

// app.use(express.static('public'));
// Decide if you need to use the static page

app.get('/', function (request, response){
  console.log("Can you See Me?");
});
