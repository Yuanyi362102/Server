const express = require('express')
const db = require('../db/database')
const config = require('../config')
const jwt = require('jsonwebtoken')//用于生成token
const { reg_login_schema } = require('../schema/user')//使用es6新特性，只需要导出对象的(reg_login_schema)属性
const { changeInfo_schema } = require('../schema/user')//使用es6新特性，只需要导出对象的(reg_login_schema)属性
//验证数据的中间件
const expressJoi = require('@escook/express-joi')


const router = express.Router()
router.use(express.urlencoded({ extended: false }))//不注册这个中间件，joi将无法起作用
router.use(express.json());

router.post('/register', expressJoi(reg_login_schema), (req, res) => {
    console.log(req.body);
    let username = req.body.username
    let password = req.body.password
    const checkSql = `select * from user where username = ?`
    db.query(checkSql, username, (err, results) => {
        if(err){
            return res.send({
                status: 1,
                meg: '注册失败'
            })
        }
        if (results.length >= 1) {
            return res.send({
                status: 1,
                meg: '用户名被占用'
            })
        }
        const sql = `insert into user (username,password) values (?,?)`
        db.query(sql, [username, password], (err, results) => {
            if (err) {
                return res.send({
                    status: 1,
                    meg: '注册失败'
                })
            }
            if (results.affectedRows !== 1) {
                return res.send({
                    status: 1,
                    meg: '注册失败'
                })
            }
            res.send({
                status: 0,
                meg: '注册成功'
            })
        })
    })

})

router.post('/sign_in',expressJoi(reg_login_schema), (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const sql = `select * from user where username = ?`
    db.query(sql,username,(err,results)=>{
        if(err){
            return res.send({
                status: 1,
                meg: '登录失败'
            })
        }
        if(results.length !== 1){
            return res.send({
                status: 1,
                meg: '用户不存在'
            })
        }
        if(results[0].password !== password){
            return res.send({
                status: 0,
                meg: '密码错误'
            })
        }
        //在服务端生成token
        const user = {...results[0]}//将信息挂在在user上
        const tokenStr = jwt.sign(user,config.jwtScrectKey,{expiresIn:config.expiresIn})   
        if(results[0].password === password){
            return res.send({
                status: 0,
                meg: '登录成功',
                token:'Bearer '+tokenStr
            })
        }
    })
})

router.post('/changeinfo',expressJoi(changeInfo_schema),(req,res)=>{
    const oldUsername = req.body.oldUsername
    const username = req.body.username
    const password = req.body.password
    const checkSql = `select * from user where username = ?`
    db.query(checkSql,oldUsername,(err,results)=>{
        if(err){
            return res.send(err)
        }
        if(results.length !== 1){
            return res.send('用户不存在')
        }
        const sql = `update user set username = ? ,password = ? where username = ?`
        db.query(sql,[username,password,oldUsername],(err,results)=>{
            if(err){
                return res.send(err)
            }
            if(results.affectedRows !== 1){
                return res.send('修改用户信息失败')
            }
            res.send('修改成功')
        })
    })
})


module.exports = router