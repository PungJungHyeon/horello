const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const dbconfig = require('../../../config/database.js');
const connection = mysql.createConnection(dbconfig);

router.route('/')
.get((req, res) => {
    connection.query('SELECT * FROM Users', (err, rows, fields) => {
        if(!err){
            res.send(rows);
        }else{
            res.send(err);
        }
    });
})
.post((req,res) => {
    res.send(req.body);
})

router.route('/:id')
    .get(function(req, res){
        let id = req.params.id;
        connection.query('SELECT * FROM Users WHERE uid = ?', [id], (err, rows, fields) => {
            res.send(rows);
        });
    })
    .put(function(req, res){
        let id = req.params.id;
        let row = connection.query('UPDATE Users SET Users WHERE uid = ?', [id]);
        res.send(row);
    })
    .delete(function(req, res){
        let id = req.params.id;
        let row = connection.query('SELECT * FROM Users WHERE uid = ?', [id]);
        res.send(row);
    });

module.exports = router;