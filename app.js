const express = require('express');
const mustacheExpress = require('mustache-express');
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express();

app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.urlencoded({ extended: false }));

// use this block of code if you are using the session variable to sign in with a username. Otherwise, it will not work.
app.use(session({
    secret: '9blah934_bingbangbong_whoot3',
    resave: false,
    saveUninitialized: true
}));

// app.use(express.static('public'));
// Decide if you need to use the static page and how it really works and what its purpose really is

// [] are arrays and {} are objects
const people = [
  {username: 'ayanna', password:'minecraft', logins: 0},
  {username: 'melania', password:'talks', logins: 0},
  {username: 'sophia', password:'runs', logins: 0},
];

// This is to create a login web page at the root path.
app.get('/', function (request, respond){
  respond.render('login');
});

//This section creates a request.session that only applies to this. The code request.session is essentially an object where information can be stored in.
app.post('/login', function (request, respond){
  const login_username = request.body.give_username;
  const login_password = request.body.give_password;

  let person = null;

  for (let i = 0; i < people.length; i++){
    if (login_username === people[i].username && login_password === people[i].password){
      person = people[i];
      console.log(person);
      request.session.who = person;
      console.log(request.session.who);

      respond.redirect('/welcome');
    } else {
      respond.redirect('/')
    }
  }
})

// This creates a welcome page after the login is successful.
app.get('/welcome', function(request, respond){
  respond.render('welcome',{
    loginName: request.session.who.username});
});

// This creates a port 3000 so that the app can "listen" in to. Basically grants access?
app.listen(3000, function(){
  console.log('Node.js Rule!');
})
