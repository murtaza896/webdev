
// using SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');

const msg = {
    to: 'saifsocial2711@gmail.com',
    from: 'noreply@sih.com',
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};
sgMail.send(msg);