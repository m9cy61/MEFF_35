var nodemailer = require('nodemailer');
module.exports = nodemailer.createTransport({
     host: "smtp.gmail.com",
     port: 465,
     secure: true,
     auth: {
          user: "dailybuy0531@gmail.com",
          pass: "vumyhusgwckfqlqu",
     },
});