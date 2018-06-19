var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');

var users = require('./routes/users');

var app = express();
var port = 3000;

//connect to signup project on localhost default port: 27017
//setdefault connection
mongoose.connect('mongodb://localhost/signupProject');
//get default connection 
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));
db.once('open', () => {
  console.log('Connected to the Database!');
  
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  next();
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Public Folder
app.use(express.static('./public'));

// Adding routes
app.use('/userSignup', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  // console.log("ed");return;
  console.log(err);
  res.locals.message = err;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send(err);
});

app.listen(port, () => console.log(`Server started on port ${port}`));

module.exports = app;