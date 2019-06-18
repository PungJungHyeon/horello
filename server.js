const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const dbconfig = require('./config/database.js');

const connection = mysql.createConnection(dbconfig);
const app = express();
const users = require('./routes/users');
const projects = require('./routes/projects');
const tasks = require('./routes/tasks');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/users', users);
app.use('/projects', projects);
app.use('/tasks', tasks);
app.get('/', function(req, res, next){
    res.send('Hello, world!');
});

app.post('/', (req, res, next) => {
    res.send(req.body.uname);
});
app.listen(app.get('port'));