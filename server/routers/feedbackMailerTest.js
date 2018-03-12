const express = require('express');
const nodemailer = require('nodemailer');
const feedbackMailer = express.Router();

feedbackMailer.post('/reportbug', (req, res) => {
    let { name, problem, description, location } = req.body;
   // create reusable transporter object using the default SMTP transport
   let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'landonnodemailer@gmail.com', // generated ethereal user
            pass: 'devmountainnodemailer'  // generated ethereal password
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {  
        to: 'landonwjohnson+tjc8uvdvy2oreploz92s@boards.trello.com', // list of receivers
        subject: `${problem} #User_Bugs`, // Subject line
        text: `Message
=======
From **${name}**
>${description}

---
Location:
    ${location}
`
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        res.send('Message Sent')

    });
})


module.exports = feedbackMailer;