const path = require('path');
const connhelper = require('../../config/database');
const crypto = require('crypto');
function verifyPassword(password, hashedPassword) {
     const inputHashedPassword = crypto.createHash('sha256').update(password).digest('hex');
     return inputHashedPassword === hashedPassword;
}
module.exports = {

     login: (req, res) => {

          const filePath = path.resolve(__dirname, '..', '..', 'pages', 'login.html');
          res.sendFile(filePath);

     },
     post: (req, res) => {
          var email = req.body.email;
          var password = req.body.password;
          var sql = "SELECT * FROM user_data WHERE email=? and password=?;";

          connhelper.query(sql, [email, password], (err, results, fields) => {
               // console.log(results);
               if (results.length > 0) {
                    // 登入成功
                    const user = results[0];
                    req.session.user = {
                         id: user.user_id,
                         email: user.email,
                         user_name: user.user_name,
                         pic:user.selfie,
                    };

                    res.json({ redirectUrl: '/member' });
               } else {
                    // 帳號或密碼不符
                    res.status(401).json({ error: "帳號或密碼不正確" });
               }
          });
     },
     post_encypted: (req, res) => {

          var password = req.body.password;
          // 加密版-------------------------------------------
          var sql = "SELECT * FROM user_data WHERE email=?;";
          connhelper.query(sql, req.body.email, (err, results, fields) => {

               // console.log(results);
               if (results) {
                    const hashedPassword = results[0].password;

                    // 驗證密碼
                    const isValidPassword = verifyPassword(password, hashedPassword);

                    if (isValidPassword) {
                         const user = results[0];
                         req.session.user = {
                              id: user.user_id,
                              email: user.email,
                              user_name: user.user_name,
                              pic:user.selfie,
                         }
                         // console.log('登入成功')
                         // console.log(req.session.user)
                         res.json({ redirectUrl: '/member' });
                    }

               }
          });

     },
     google: (req, res) => {
          // console.log("google登入被呼叫")
          let google_email = req.body.email;
          let google_user_name = req.body.name;
          let google_pic = req.body.picture;

          let sql = "SELECT * FROM user_data WHERE email=?;";
          connhelper.query(sql, google_email, (err, results, fields) => {
               if (!err) {
                    if (results[0]) {   //登入成功後設定session
                         // console.log(results[0])
                         req.session.user = {
                              id: results[0].user_id,
                              email: results[0].email,
                              user_name: results[0].user_name,
                              pic: results[0].selfie,
                              google_pic: google_pic
                         };

                         res.send('登入成功')
                         // res.json({ redirectUrl: '/member' });
                    } else {
                         let sql = 'INSERT INTO user_data (email,user_name,password)VALUES(?,?,"gojsgjsi#lvs4@%%lkhrlgi");' //若沒有註冊過則自動新增會員資料進資料庫(沒有id)
                         connhelper.query(sql, [google_email, google_user_name], (err, results, field) => {
                              if (!err) {
                                   let select_id = 'SELECT user_id FROM user_data WHERE email =?;';                           //把上一步驟新增的資料重新取得其id
                                   connhelper.query(select_id, [google_email], (err1, results1, field1) => {
                                        req.session.user = {
                                             id: results1[0].user_id,
                                             email: google_email,
                                             user_name: google_user_name,
                                             pic: google_pic,
                                             google_pic: google_pic
                                        };
                                        console.log('註冊成功')
                                        res.send('註冊成功');
                                   });

                              } else { console.log(err) }
                         })
                    }
               } else {
                    res.send(err.sqlMessage)
               }
          });
     },

     logout: (req, res) => {

          req.session.destroy();
          res.json({ redirectUrl: '/login' });

     }

}