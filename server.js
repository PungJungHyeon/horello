const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbconfig = require('./config/database.js');

const connection = mysql.createConnection(dbconfig);
const app = express();
const users = require('./routes/users');

app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/users', users);

app.get('/', function(req, res, next){
    res.send('Hello, world!');
});

app.post('/', (req, res, next) => {
    res.send(req.body.uname);
});
app.listen(app.get('port'));