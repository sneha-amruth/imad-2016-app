var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool= require('pg').Pool;

var config= {
    user: 'sneha-amruth',
    database: 'sneha-amurth',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));

var pool=new Pool(config);
app.get('/test-db', function (req, res) {
 //make a select request and return with a response
 pool.query('SELECT* FROM test', function(err,result)){
    if(err){
        res.status(500).send(err.toString());
    } 
    else{
        res.send(JSON.stringify(result));
    }
 });
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

app.get('/poetry', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'poetry.html'));
});

app.get('/articles', function (req, res) {
   res.sendFile(path.join(__dirname, 'ui', 'articles.html'));
});

app.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'about.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
