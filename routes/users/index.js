const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);



router.route('/')
    .get((req, res) => {
        if (req.query.uid) {
            connection.query('SELECT * FROM users WHERE uid = ?', [req.query.uid], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        
        else if (req.query.uemail) {
            connection.query('SELECT * FROM users WHERE uemail like ?', [req.query.uemail], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.query.uname) {
            connection.query('SELECT * FROM users', [req.query.uname], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.query.pid) {
            connection.query('SELECT * FROM users WHERE uid in (SELECT uid FROM user_in_project WHERE pid = ?)', [req.query.pid], (err, rows, field) => {
                if(!err) {
                    res.send(rows);
                }else{
                    res.send(err);
                }
            });
        }
        else if(req.query.crid) {
            connection.query('SELECT * FROM users WHERE uid in (SELECT uid FROM user_in_chatrooms WHERE crid = ?' [req.query.crid], (err, rows, field) => {
                if(!err){
                    res.send(rows);
                }else{
                    res.send(err);
                }
            });
        }
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