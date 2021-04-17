import config from '../config.json';
import nodemailer from 'nodemailer';
const transporter = nodemailer.createTransport(config.nodemailer);

export default function sendEmail(data: any) {
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