"use server"

import nodemailer, { Transporter } from 'nodemailer';



const transporter: Transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
  pool: true,
  service: process.env.SMPT_SERVICE,
  port: parseInt(process.env.SMPT_PORT || '465'),
  auth: {
    user: process.env.SMPT_MAIL,
    pass: process.env.SMPT_PASSWORD,
  },
  maxConnections: 1
})


export const sendEmail = async (body: string, subject:string, sendTo: string) => {
  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: sendTo,
    html: body,
    subject: subject,
  }

  transporter.sendMail(mailOptions, (error: any, info: any) => {
    if(error) return console.log(error);
    
    console.log('Email sent: ', info);
  })
}