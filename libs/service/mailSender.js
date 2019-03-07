const nodemailer = require('nodemailer');

async function send (mail ){

let account = await nodemailer.createTestAccount();
const config = {
    host: 'smtp.126.com', 
    port: "smtp.ethereal.email",
    auth: {
        user:  account.user, 
        pass: account.pass  
    }
};

var transporter = nodemailer.createTransport(config);
transporter.sendMail(mail, function(error, info){
    if(error) {
        return console.log(error);
    }
    console.log('mail sent:', info.response);
});
}
module.exports = send