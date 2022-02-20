const { google } = require('googleapis');
const nodemailer = require("nodemailer");


const email  = async( req, res, next) => {  
   
    const { name, email, phone, message } = req.body;

    const contentHtml=`
    
    <h1> Formulario de nodemailer </h1>
    <ul>
        <li>name: ${name} </li>
        <li>email: ${email} </li>
        <li>phone: ${phone} </li>
        <li>message: ${message} </li>
    </ul>
    `


const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const SECRET_ID = process.env.GOOGLE_SECRET_ID;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

const oAuth2Client = new google.auth.OAuth2(
    CLIENT_ID,
    SECRET_ID,
    REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(){
    try {

        const accessToken = await oAuth2Client.getAccessToken()

         const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
              type: "OAuth2",
              user: process.env.EMAIL,
              accessToken: accessToken,
              clientId: process.env.GOOGLE_CLIENT_ID,
              clientSecret: process.env.GOOGLE_SECRET_ID,
              refreshToken: process.env.REFRESH_TOKEN
            },
          });

          const mailOptions = {
              from: "Pagina web Nodemailer <margri764@gmail.com>",
              to: process.env.EMAIL,
              subject: "Nodemailer prueba",
              html: contentHtml,
          };
        
        const result = await transporter.sendMail(mailOptions);     
        res.status(200).json("true")
      
        return result


    } catch (error) {
        next(error)
   }
}

sendMail()
.then (result => res.status(200))
.catch(error =>  next(error))
};

module.exports = email ;