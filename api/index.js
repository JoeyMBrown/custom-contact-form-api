const nodemailer = require("nodemailer");

export default allowCors(handler);

const allowCors = fn => async (req, res) => {
  res.setHeader('Access-Control-Allow-Credentials', true)
  res.setHeader('Access-Control-Allow-Origin', '*')
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  )
  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }
  return await fn(req, res)
}

async function handler(req, res) {

    let { body } = req;
  
    let name = body.name;
    let email = body.email;
    let subject = body.subject;
    let message = body.message;
  
    const emailData = {
      name: name,
      email: email,
      subject: subject,
      message: message
    }
  
    if (name.length < 1 || email.length < 1 || subject.length < 1 || message.length < 1) {
      res.status(403);
      res.json({ message: "Bad Request."});
    } else {
  
    let emailResponse = await sendEmail(emailData);
    
      if(emailResponse.messageId.length > 1) {
        res.status(200);
        res.json({ message: "Thank you for reaching out.  I'm looking forward to connecting!" });
      } else {
        res.status(500);
        res.json({ message: "ERROR in catch block of attempting to send email"});
      }
    }
  };
  
  // async..await is not allowed in global scope, must use a wrapper
async function sendEmail(emailData) {

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    host: process.env.SMTP_HOST,
    port: 587,
    secure: true, // true for 465, false for other ports
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD, 
    },
});

// send mail with defined transport object
let res = await transporter.sendMail({
    replyTo: emailData.email,
    from: emailData.email, // sender address
    to: process.env.EMAIL_USER,
    subject: "Joeyb.dev Contact Form: " + emailData.name + " - " + emailData.subject, // Subject line
    text: emailData.message, // plain text body
    html: "<p>" + emailData.message + "</p>", // html body
});

return res;

}