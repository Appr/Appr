// const express = require('express');
// const nodemailer = require('nodemailer');
// const feedbackRouter = express.Router();


// feedbackRouter.post('/send', (req, res) => {
//     console.log(req.body);

//    // create reusable transporter object using the default SMTP transport
//    let transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'landonnodemailer@gmail.com', // generated ethereal user
//         pass: '*******'  // generated ethereal password
//     },
//     tls: {
//         rejectUnauthorized: false
//     }
// });

//     // setup email data with unicode symbols
//     let mailOptions = {  
//         to: 'feedback73+edgeyp4nhpdpy3x39k8c@boards.trello.com', // list of receivers
//         subject: `${req.body.problem} #User_Bugs`, // Subject line
//         text: `###Message: 
// >${req.body.description}

// ---

// Location:
//     ${req.body.location}
// `
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//     });
// })


// module.exports = feedbackRouter;
