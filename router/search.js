const express = require('express')
const db = require('../db/database')

const router = express.Router()

router.post('/search',(req,res)=>{
    const keyword = req.body.keyword
    const sql = `SELECT * FROM searchNews WHERE newsName LIKE ?`
    db.query(sql,[`%${keyword}%`],(err,results)=>{
        if(err){
            return res.send(err)
        }
        if(results.length === 0){
            return res.send('未找到相关信息')
        }
        if(results.length > 0){
            return res.send(results)
        }
    })
})

module.exports = router