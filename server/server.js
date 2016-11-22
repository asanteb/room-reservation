var express   = require('express'),
    http      = require("http"),
    app       = express(),
    server    = http.createServer(app),
    rp = require("request-promise");

/*

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
*/

app.use(express.static(__dirname + '/'));

app.post('/login:user', function(req, res){
    console.log('Hello ', req.params.user);

    str = req.params.user.split("?");
    var user = str[0];
    var pass = str[1];

    var options = {
       method: 'POST',
       uri: 'http://cscdevprod01.txwes.edu/~abuil/csc4341/class_project/server/login_process.php',
       form: {
         username: user,
         password: pass
       },
       headers: {

       }
    };

    rp(options)
       .then(function (body) {
           // POST succeeded...
           console.log(body);

           var object = {
             name: user,
             pass: pass,
             message: 'Hi, it worked'
           }

           if (body == 'OK'){
              res.json(object);
           }
       })
       .catch(function (err) {
           // POST failed...

           var object = {
             name: 'err',
             pass: 'err',
             message: 'No Hi, it DID NOT WORK'
           }
           res.json(object);
           console.log(err);
       });

    console.log('PHP Command Sent');
});

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
