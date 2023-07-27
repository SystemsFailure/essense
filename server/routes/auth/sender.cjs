// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     host: 'localhost',
//     port: 2525,
//     auth: {
//         user: 'example',
//         pass: 'a57518a9e8858187463d53d5b7d3aa0c'
//     }
// });

const nodemailer = require('nodemailer')

// initialize nodemailer
const transporter = nodemailer.createTransport(
    {
        service: 'gmail',
        auth: {
            user: 'adebola.rb.js@gmail.com',
            pass: 'password_for_your_email_address'
        }
    }
);


const mailOptions = {
    from: '"Adebola" <adebola.rb.js@gmail.com>', // sender address
    to: 'lnkonion2@gmail.com', // list of receivers
    subject: 'Welcome!',
    template: 'email', // the name of the template file i.e email.handlebars
    context: {
        name: "Adebola", // replace {{name}} with Adebola
        company: 'My Company' // replace {{company}} with My Company
    }
};

function send() {
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });
}

module.exports = send;