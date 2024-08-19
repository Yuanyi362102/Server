const express = require('express')
const router = express.Router()
const db = require('../db/database')

const pic = [
    "https://krseoul.imgtbl.com/i/2024/08/19/66c296964f836.jpg",
    "https://krseoul.imgtbl.com/i/2024/08/19/66c29697b3c88.jpeg",
    "https://krseoul.imgtbl.com/i/2024/08/19/66c2969795f48.jpg",
]

function getRandomInt(min, max) {
    // 确保min <= max
    min = Math.ceil(min);
    max = Math.floor(max);
    // 生成0到1之间的随机数，然后乘以(max - min + 1)，最后取整
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

router.get('/user_pic', (req, res) => {
    const randomInt = getRandomInt(0, 2);
    const checkSql = `select pic from user where username = ?`
    db.query(checkSql, req.user.username, (err, results) => {
        if (err) {
            res.send(err)
        }
        /* 数据库中已经有头像 */
        if (results.length === 1) {
            res.send({
                meg: "获取头像成功",
                username: req.user.username,
                pic: results[0].pic
            })
        }
        /* 数据库没有头像则随机分配一个头像 */
        else {
            const sql = `update user set pic = ? where username = ?`
            db.query(sql, [pic[randomInt], req.user.username], (err, results) => {
                if (err) {
                    console.log(req.user.username + pic[0]);
                    return res.send('获取头像失败')
                }
                if (results.affectedRows !== 1) {
                    return res.send('获取头像失败')
                }
                if (results.affectedRows === 1) {
                    const sql02 = `select pic from user where username = ?`
                    db.query(sql02, req.user.username, (err, results) => {
                        if (err) {
                            return res.send('图片获取失败')
                        }
                        if (results.length !== 1) {
                            return res.send('图片获取失败')
                        }
                        res.send({
                            meg: "获取头像成功",
                            username: req.user.username,
                            pic: results[0].pic
                        })
                    })
                }

            })
        }
    })
})

module.exports = router