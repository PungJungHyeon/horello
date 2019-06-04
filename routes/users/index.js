const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const dbconfig = require('../../config/database.js');
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
    connection.query(
        'INSERT INTO Users(uemail, upassword, uname, usex) VALUES(?, ?, ?, ?)', 
        [req.body.uemail, req.body.upassword, req.body.uname, req.body.usex]
        , (err, rows, fields) => {
            if(!err){
                res.send(rows);
            }else{
                res.send(err);
            }
        }
    );
});

router.route('/:id')
.get(function(req, res){
    let id = req.params.id;
    connection.query('SELECT * FROM Users WHERE uid = ?', [id], (err, rows, fields) => {
        res.send(rows);
    });
})
.put(function(req, res){
    let row = connection.query(
        'UPDATE Users SET uid = ?, uemail = ?, upassword = ?, uname = ?, usex = ? WHERE uid = ?',
        [user.uid, user.uemail, user.upassword, user.uname, user.uname, user.uid]);
    res.send(row);
})
.delete(function(req, res){
    let id = req.body.id;
    let row = connection.query('DELETE FROM Users WHERE uid = ?', [id]);
    res.send(row);
});

module.exports = router;