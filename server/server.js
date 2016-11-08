var express   = require('express'),
    http      = require("http"),
    app       = express(),
    server    = http.createServer(app);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : 'secret',
  database : 'my_db'
});

  //
connection.connect();

connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  if (err) throw err;
    console.log('The solution is: ', rows[0].solution);
  });

connection.end();
///

app.get('/api/:token', function(req, res){


});

app.get('/api/getyear', function(req, res){

});

app.get('/api/compare', function(req, res){

});

app.get('/api/addevent', function(req, res){

});


console.log('Connected to port 3002');
server.listen(3002);
