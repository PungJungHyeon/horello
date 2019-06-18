const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);



router.route('/')
    .get((req, res) => {
        if (req.query.tid) {
            connection.query('SELECT * FROM tasks WHERE tid = ?', [req.query.tid], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.query.tname) {
            connection.query('SELECT * FROM tasks WHERE tname like ?', [req.query.tname], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if(req.query.project_pid){
            connection.query('SELECT * FROM tasks WHERE project_pid = ?', [req.query.project_pid], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
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
            'INSERT INTO tasks(tname, project_pid, category) VALUES(?, ?, 0)',
            [req.body.tname, req.body.project_pid], (err, rows, fields) => {
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
            'UPDATE tasks SET tname = ?, project_pid = ?, category = ? WHERE tid = ?',
            [req.body.tname, req.body.project_pid, req.body.category, req.body.tid], (err, rows, fields) => {
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
    * tid: 사용자 ID 
    */
    .delete(function (req, res) {
        connection.query(
            'DELETE FROM tasks where tid = ?',
            [req.parmas.id], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            }
        );
    });

module.exports = router;