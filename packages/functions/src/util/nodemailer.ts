
// @ts-expect-error ts-migrate(2451) FIXME: Cannot redeclare block-scoped variable 'config'.
const config = require('../config.json');
const nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport(config.nodemailer);

module.exports = function sendEmail(data: any) {
  return transporter.sendMail({
    from: {
        name: data.name||'CuppaZee App',
        address: 'noreply@cuppazee.app'
    },
    to: data.to,
    subject: data.subject,
    text: data.text,
    html: data.html
  })
}