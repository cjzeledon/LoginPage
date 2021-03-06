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

app.use(express.static('views'));
// Decide if you need to use the static page and how it really works and what its purpose really is

// [] are arrays and {} are objects
const people = [
  {username: 'ayanna', password:'minecraft', logins: 0, avatar:'https://avatarfiles.alphacoders.com/767/76751.png'},
  {username: 'melania', password:'talks', logins: 0, avatar:'https://avatarfiles.alphacoders.com/481/48188.jpg'},
  {username: 'sophia', password:'runs', logins: 0, avatar:'https://avatarfiles.alphacoders.com/642/64288.jpg'},
];

// This is to create a login web page at the root path.
app.get('/', function (request, respond){
  respond.render('login');
});

//This works fantastic with redirecting you to the login page. However, when you hit the log out button, it does not erase your session. If you type in /welcome on the URL box, you can easily go back to the welcome page and still with your user identification.
app.post('/', function (request, respond){
  // this is where you need to end or destroy the current session
  // Remember to add the request.session.destroy BEFORE respond.render because JS reads from top to bottom
  request.session.destroy(function(err) {
    // cannot access session here
  });
  respond.render('login');

});

// Below refers to Sign Up pages
app.get('/create_account', function(request, respond){
  respond.render('create_account');
})

app.post('/create_account', function (request, respond){
  respond.render('create_account');
});

//This section creates a request.session that only applies to this. The code request.session is essentially an object where information can be stored in.
app.post('/login', function (request, respond){
  const login_username = request.body.give_username;
  const login_password = request.body.give_password;
  let person = null;

  for (let i = 0; i < people.length; i++){
    // this loop and if statement is just to set the user from null to have a value
    // the only way that happens is if they type in a matching username and password
    if (login_username === people[i].username && login_password === people[i].password){
      // if true the person will be re assigned to not null
      person = people[i];
      // console.log(person);
      request.session.who = person;
      // console.log(request.session.who);
    }
  }
  // you need an if statement here if user is not null show them welcome.mustache
  // if the user IS null then they haven't  logged in correctly
  // so they need to see the login screen
  if (person !== null){
    request.session.who.logins++
    respond.redirect('/welcome');
  } else {
    respond.redirect('/');
  }
});

// This creates a welcome page after the login is successful.
app.get('/welcome', function(request, respond){
  // log_out = request.body.sign_out;

  respond.render('welcome',{
    loginName: request.session.who.username,
    loginTimes: request.session.who.logins,
    loginTimesRandom: Math.random(),
    // Figure out why this one is not working as this is alredy a built-in math generation of numbers. It keeps saying math is not defined.
    // Figured out why it was not "defined". Turns out math.random() does not work and will return as undefined. Math.random() is the correct one.
    loginAvatar: request.session.who.avatar,
  });

  //This idea does not work with trying to log out.
  // if (request.session.log_out){
  //   respond.redirect('/');
  // }
});

  //This idea does not work with trying to log out.
// app.get('/signout', function(request, respond){
//   respond.redirect('/');
// })

// This creates a port 3000 so that the app can "listen" in to. Basically grants access?
app.listen(3000, function(){
  console.log('Node.js Rule!');
})
