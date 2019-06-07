const express = require('express');
const mysql = require('mysql');
const router = express.Router();

const dbconfig = require('../../config/database.js');
const connection = mysql.createConnection(dbconfig);



router.route('/')
    .get((req, res) => {
        if (req.query.pid) {
            connection.query('SELECT * FROM projects WHERE pid = ?', [req.query.pid], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        
        else if (req.query.pname) {
            connection.query('SELECT * FROM projects WHERE pname like ?', [req.query.pname], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if (req.query.manager_id) {
            connection.query('SELECT * FROM projects WHERE manager_id = ?', [req.query.manager_id], (err, rows, fields) => {
                if (!err) {
                    res.send(rows);
                } else {
                    res.send(err);
                }
            });
        }
        else if(req.query.uid){
            connection.query('SELECT * FROM projects WHERE pid IN (SELECT pid FROM user_in_projects WHERE uid = ?'[req.query.uid], (err, rows, field) => {
                if(!err) {
                    res.send(rows);
                }else {
                    res.send(err);
                }
            })
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
            'INSERT INTO projects(pname, start_date, end_date, manager_id) VALUES(?, ?, ?, ?)',
            [req.body.pname, req.body.start_date, req.body.end_date, req.body.manager_id], (err, rows, fields) => {
                if (!err) {
                    res.send(rows[0]);
                    /*connection.query('INSERT INTO user_in_projects(uid, pid) VALUES(?, ?)',
                    [req.body.manager_id, rows.insertId], (err, rows, fields) => {
                        if(!err){
                            res.send(rows);
                        }
                        else {
                            res.send(err);
                        }
                    });*/
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
            'UPDATE projects SET pname = ? WHERE pid = ?',
            [req.body.pname, req.body.pid], (err, rows, fields) => {
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
    * pid: 사용자 ID 
    */
    .delete(function (req, res) {
        connection.query(
            'DELETE FROM projects where pid = ?',
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