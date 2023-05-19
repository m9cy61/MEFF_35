const path = require('path');
const connhelper = require('../../config/database');
const crypto = require('crypto');
module.exports = {

     register: (req, res) => {

          var filePath = path.resolve(__dirname, '..', '..', 'pages', 'register.html');
          res.sendFile(filePath);
     },

     post: (req, res) => {
          var sql = "INSERT INTO user_data (email,password)VALUES(?,?);";
          connhelper.query(sql, [req.body.email, req.body.password], (err, results, fields) => {

               if (!err) {
                    // console.log(results);
                    res.json({ redirectUrl: '/login' });
               } else {
                    console.log(err);
               }

          })
     },

     // 加密版--------------------------------------------------------------------

     post_ecrypted: (req, res) => {
          // // 加密密碼

          var email = req.body.email;
          var password = req.body.password;
          const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
          var sql = "INSERT INTO user_data (email, password) VALUES (?, ?);";
          connhelper.query(sql, [email, hashedPassword], (err, results, fields) => {
               if (!err) {

                    // console.log(results);
                    res.json({ redirectUrl: '/login' });
               } else {

                    console.log(err);
               }
          });


     }



}