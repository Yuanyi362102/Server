/* 导入第三方库 */
const express = require('express')
const cors = require('cors')
const joi = require('joi')
const expressJwt = require('express-jwt')
const axios = require('axios');
/* 导入自定义库 */
const Newsrouter = require('./router/news')
const Userrouter = require('./router/user')
const Searchrouter = require('./router/search')
const UserPicrouter = require('./router/user_pic')
const Commentrouter = require('./router/comment')
const Feedbackrouter = require('./router/feedback')
const config = require('./config')
const app = express()


/* 注册第三方中间件 */
app.use(cors())
app.use(express.urlencoded({extended:false}))//不注册这个中间件，joi将无法起作用
app.use(express.json());
app.use(expressJwt({secret:config.jwtScrectKey}).unless({path:[/^\/api/]}))


/* 注册自定义中间件 */
app.use('/api',Newsrouter)
app.use('/api',Userrouter)
app.use('/api',Searchrouter)
app.use('/api',Commentrouter)
app.use('/api',Feedbackrouter)


app.use(UserPicrouter)

/* 注册路由 */
app.post('/',(req,res)=>{
    res.send('ok')
})

/* 捕获全局错误的中间件 */
app.use((err,req,res,next)=>{
    if(err instanceof joi.ValidationError){
        return res.send(err)
    }
    if(err.name === 'UnauthorizedError'){
        console.log(req.headers.Authorization);
        return res.send('身份认证失败')
    }
    res.send(err)
})

/* 启动服务器 */
app.listen('80', () => {
    console.log('server is running at http://127.0.0.1');
})