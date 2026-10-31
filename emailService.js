require('dotenv').config()
const nodemailer = require('nodemailer')

const treansport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    }
})

const sendEmial = async (to,subject,message)=>{

    const info = treansport.sendMail({
        from:process.env.EMAIL_USER,
        to,
        subject,
        text:message
    })

    return (await info).messageId
}

module.exports = sendEmial