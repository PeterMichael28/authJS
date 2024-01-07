
import {sendEmail} from './nodemailer'



const domain = process.env.NEXT_PUBLIC_APP_URL;



export const sendTwoFactorTokenEmail = async (
 email: string,
 token: string,
) => {

 const subject = `Your 2FA Code`;
 const body = `<div>
      <h2>AuthJS Tutorial 🔐</h2>
      <p>Your 2FA code: ${token}</p>
    </div>`
 await sendEmail(email, subject, body);
};

export const sendPasswordResetEmail = async (
 email: string,
 token: string,
) => {
  
  const resetLink = `${domain}/auth/new-password?token=${token}`;
  const subject = `Reset your password`;
 const body = `<div>
      <h2>AuthJS Tutorial 🔐</h2>
      <p><p>Click <a href="${resetLink}">here</a> to reset password.</p></p>
    </div>`

await sendEmail(email, subject, body);
};

export const sendVerificationEmail = async (
  email: string, 
  token: string
) => {
  const confirmLink = `${domain}/auth/new-verification?token=${token}`;
  const subject = `Confirm your email`;
  const body = `<div>
       <h2>AuthJS Tutorial 🔐</h2>
       <p>Click <a href="${confirmLink}">here</a> to confirm email.</p>
     </div>`
  
  
     await sendEmail(email, subject, body);
};