const nodemailer = require('nodemailer');

async function send (mail, code ){
// 创建一个SMTP客户端配置
const config = {
    host: 'smtp.126.com', 
    port: 25,
    auth: {
        user:  mail, //刚才注册的邮箱账号
        pass: code  //邮箱的授权码，不是注册时的密码
    }
};

// 创建一个SMTP客户端对象
var transporter = nodemailer.createTransport(config);
transporter.sendMail(mail, function(error, info){
    if(error) {
        return console.log(error);
    }
    console.log('mail sent:', info.response);
});
}
// 发送邮件
module.exports = send