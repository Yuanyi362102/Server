const joi = require('joi')

const username = joi.string().pattern(/^[\u4e00-\u9fa5a-zA-Z0-9]+$/).min(1).max(10).required().messages({
    "string.empty":'用户名必填',
    "any.required":'用户名必填',
    "string.pattern.base": '用户名只能包含 中文字符/a-z/A-Z/0-9',
    "string.max":'用户名长度不能超过10',
})
const password = joi.string().pattern(/^[\S]{6,12}$/).required().messages({
    "string.empty":'密码必填',
    "any.required":'密码必填',
    "string.pattern.base":'密码必须是6~12个非空白字符',
})
//验证注册和登录表单数据的规则对象
exports.reg_login_schema = {
    body:{
        username,
        password,
    }
}





