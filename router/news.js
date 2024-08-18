const express = require('express')
const db = require('../db/database')

const router = express.Router()

router.get('/img',(req,res)=>{
    newsName = req.query.name;
    const sql = `select img,num from HotNews where name = ?`
    db.query(sql,newsName,(err,results)=>{
        if(err){
            return res.send(err.message)
        }
        if(results.length !== 1){
            res.send('未找到相关信息')
        }
        res.send(results[0])
    })
})

router.get('/hotnews',(req,res)=>{
    const sql = `select * from HotNews`
    db.query(sql,(err,results)=>{
        if(err){
            res.send(err.message)
        }
        res.send(results)
    })
})

module.exports = router