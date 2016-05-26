
var express = require('express');
var session = require('express-session')
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
//var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql = require('mysql');

//////// routes:

/*
  Add route:
    crear variable aqui abajito
    añadir ruta mas abajito
    añadir html en views/html
    crear jade en views con include <elhtml>
    crear ruta.js en routes
    modificar el form del html
*/

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var addpaciente = require('./routes/addpaciente');
var adddoctor = require('./routes/adddoctor');
var tablepacientes = require('./routes/tablepacientes');
var tabledoctores = require('./routes/tabledoctores');
var viewpaciente = require('./routes/viewpaciente');
var viewmedico = require('./routes/viewmedico');
var viewhospitalizacion = require('./routes/viewhospitalizacion');
var addhospitalizacion = require('./routes/addhospitalizacion');

/*
  visualizar views:
    crear archivo.jade en /views
    npm start
    localhost:3000/archivo.jade
*/

var jaderouter = require('./routes/jaderouter');

var app = express();

//app session
app.use(session({
  secret: "1up3p5i🐨",
  resave: false,
  saveUninitialized: false,
  cookie: {}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.mysql = mysql.createConnection({
  host     : 'localhost',
  user     : 'admin',
  database : 'clinica',
  multipleStatements: true
});

app.mysql.connect();

/////////////// middleware

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

////////// setup routes

//app.use('/', routes);
//app.use('/users', users);
app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/addpaciente', addpaciente);
app.use('/adddoctor', adddoctor);
app.use('/addhospitalizacion',addhospitalizacion);
app.use('/tablepacientes', tablepacientes);
app.use('/tabledoctores', tabledoctores);
app.use('/viewpaciente', viewpaciente);
app.use('/viewmedico', viewmedico);
app.use('/viewhospitalizacion', viewhospitalizacion);

app.use('/\*.jade', jaderouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

//when using require(<this_file>) we return the app variable
module.exports = app;
