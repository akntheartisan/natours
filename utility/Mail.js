const nodemailer = require('nodemailer');

const sendMail = async (options) =>{

    const transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.EMAIL_USERNAME,
            password:process.env.EMAIL_PASSWORD
        }
    })

    const mailOptions = {
        from:process.env.EMAIL_USERNAME,
        to:options.email,
        subject:options.subject,
        text:options.message

    }

    await transporter.sendMail(mailOptions);
}

module.exports = sendMail;