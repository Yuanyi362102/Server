const express = require('express')
const router = express.Router()

router.get('/user_pic',(req,res)=>{
    res.send(req.user.username)
})

module.exports = router