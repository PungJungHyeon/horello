const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);



router.route('/')
    .get((req, res) => {
        /*if (req.params.uid) {
            connection.query('SELECT * FROM users WHERE uid = ?', [req.params.uid], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.params.uemail) {
            connection.query('SELECT * FROM users WHERE uemail like ?', [req.params.uemail], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.params.uname) {
            connection.query('SELECT * FROM users', [req.params.uname], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.params.pid) {
            connection.query('SELECT * FROM users WHERE uid in (SELECT uid FROM user_in_project WHERE pid = ?)', [req.params.pid], (err, rows, field) => {
                if(!err) {
                    res.send(rows);
                }else{
                    res.send(err);
                }
            });
        }
        else if(req.params.crid) {
            connection.query('SELECT * FROM users WHERE uid in (SELECT uid FROM user_in_chatrooms WHERE crid = ?' [req.params.crid], (err, rows, field) => {
                if(!err){
                    res.send(rows);
                }else{
                    res.send(err);
                }
            });
        }*/
        res.send('hello');
    })
    /**
     * 회원가입
     * 
     * body parmas
     * uemail: 이메일
     * upassword: 패스워드
     * uname: 이름
     * usex: 성별
     * 
     */
    .post((req, res) => {
        connection.query(
            'INSERT INTO users(uemail, upassword, uname, usex) VALUES(?, ?, ?, ?)',
            [req.body.uemail, req.body.upassword, req.body.uname, req.body.usex], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            }
        );
    })
    /**
     * 회원정보 수정
     * body params
     * uemail: 이메일
     * upassword: 패스워드
     * uname: 이름
     * usex: 성별
     */
    .put(function (req, res) {
        connection.query(
            'UPDATE users SET uemail = ?, upassword = ?, uname = ?, usex = ? WHERE uid = ?',
            [req.body.uemail, req.body.upassword, req.body.uname, req.body.usex], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            }
        );
    })
router.route('/:id')
    /**
    * 회원정보 삭제
    * 
    * body params
    * uid: 사용자 ID 
    */
    .delete(function (req, res) {
        connection.query(
            'DELETE FROM users where uid = ?',
            [req.params.id], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            }
        );
    });

module.exports = router;