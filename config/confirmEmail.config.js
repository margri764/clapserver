const nodemailer = require('nodemailer');

const mail = {
    user: 'margri764@feintdevs.com',
    pass: '@bulFeintdevs18'
}

let transporter = nodemailer.createTransport({
    host: "smtp.hostinger.com",
    greetingTimeout : 1000 * (60), // try adding greetingTimeout property 
    port: 465,
    tls: {
        rejectUnauthorized: false
    },
    secure: true, // true for 465, false for other ports
    auth: {
      user: mail.user, // generated ethereal user
      pass: mail.pass, // generated ethereal password
    },
  });

  const sendEmail = async (email, subject, html) => {
    try {
        
        await transporter.sendMail({
            from: `CLAP <${ mail.user }>`, // sender address
            to: email, // list of receivers
            subject, // Subject line
            text: "Hola amigos, suscríbance para más videos", // plain text body
            html, // html body
        });

    } catch (error) {
        console.log('Algo no va bien con el email', error);
    }
  }

//   const getTemplate = ( token) => {

  const getTemplate = ( token) => {
      return `
        <head>
            <link rel="stylesheet" href="./style.css">
        </head>
        
        <div id="email___content">
            <img src="https://i.imgur.com/eboNR82.png" alt="">
            <h2>Hola </h2>
            <p>Para confirmar tu cuenta, ingresa al siguiente enlace</p>
            <a
              
            
                href=" http://localhost:4200/artistas/perfil/${ token }"
                target="_blank"
            >Confirmar Cuenta</a>
        </div>
      `;
  }

  module.exports = {
    sendEmail,
    getTemplate
  }