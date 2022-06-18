const sgMail = require('@sendgrid/mail');
const fs = require("fs");

exports.sendTestEmail = async (req, res) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  pathToAttachment = `${__dirname}/TEST.pdf`;
  console.log(pathToAttachment);
  attachment = fs.readFileSync(pathToAttachment).toString("base64");

  const msg = {
    to: 'jungyub.woo@ontwins.com', // Change to your recipient
    from: 'jungyubw@gmail.com', // Change to your verified sender
    subject: 'Sending with SendGrid is Fun',
    text: 'and easy to do anywhere, even with Node.js',
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    attachments: [
      {
        content: attachment,
        filename: "TEST.pdf",
        type: "application/pdf",
        disposition: "attachment"
      }
    ]
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      res.status(200).send("mail Sent");
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({
        message: "mail 발송 실패",
      });
    })
}