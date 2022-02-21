/*
 * On déclare nos constante
 * ************************ */
// import nodemailer
const nodemailer = require("nodemailer");

require("dotenv").config();

// Déclaration du module de connection à notre Gmail (transporteur)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  service: "gmail",
  port: "587",
  secure: false,
  auth: {
    user: process.env.USER_NODMAILER,
    pass: process.env.Pw_NODMAILER,
  },
});

module.exports = {
  // Action envoi mail par nodemailer
  SendEmailCandidate: (req, res) => {
    // console.log("je suis dans le controlleur nodemailer");
    // console.log("req.body", req.body);

    const message = "Votre mail a bien été envoyé !";
    arrayFiles = [];

    // initialisation du tableau array avec data signature
    arrayFiles.push({
      filename: "logo.webp",
      path: "public/images/logo/logo.png",
      cid: "signatureLogo", //same cid value as in the html img src
    });

    // console.log(arrayFiles); // On configure notre signature du mail à envoyer par nodemailer

    const mailOptions = {
      from: process.env.USER_NODMAILER,
      to: req.body.mail,
      bcc: req.body.mailEmployeur,
      subject: req.body.subject,
      html: `
      <strong>Vos coordonnées:</strong>
      <br>
      Nom: ${req.body.name}
      <br>
      Prénom: ${req.body.lastName}
      <br>
      Téléphone: ${req.body.phone}
      <br>
      <br>
      <strong>Message de l'employeur:</strong>
      <br>
      ${req.body.textMessage} <br><br>
      <div style="display: flex;margin-bottom: 15px;">
      <span>Cordialement,</span>
      </div>  
        <div style="display: flex;margin-bottom: 15px;">  
         <div style="margin-top:auto;margin-bottom:auto;width:100px;height:auto">
          <img style="width:100%" src="cid:signatureLogo"
              alt="logo">
         </div>  
        <div style="text-align:left;margin-left: 15px;">
         <div style="font-size: 13px;">
              <strong><span>Skew application </span></strong>
         </div>  
         <div style="font-size: 10px;">
              <div style="display: flex;">
                  <span style="margin-right:2px">Adresse:</span>
                  <span>18 rue Georges Bizet</span>
              </div>  
              <div style="display: flex;">
                  <span style="margin-right:2px">Code postal:</span>
                  <span>72700</span>
              </div>  
              <div style="display: flex;">
              <span style="margin-right:2px">Ville:</span>
              <span>Allonnes</span>
               </div>  
              <div style="display: flex;">
                  <span style="margin-right:2px">Email:</span>
                  <a href="mailto:${process.env.USER_NODMAILER}" style="color:#428BCA;">${process.env.USER_NODMAILER}</a>
              </div>  
              <div style="display: flex;">
                  <span style="margin-right:2px">Link:</span>
                  <a href="http://localhost:3000/" target="_blank"  rel="noreferrer" style="color:#428BCA;">
                      Skew Application</a>
              </div>  
           </div>
         </div>
       </div>
      `,
      attachments: arrayFiles,
    };
    // On demande à notre transporter d'envoyer notre mail
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("err", err),
          res.status(500).send({
            message: err.message || "Une erreur est survenue",
          });
      } else {
        return res.json({
          method: req.method,
          status: "success",
          message: message,
        });
      }
    });
  },
};
