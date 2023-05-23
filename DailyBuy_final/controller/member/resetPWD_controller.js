const path = require('path');
const connhelper = require('../../config/database')
const transporter = require('../../module/nodemailer')
function RandomPWD(length) {
     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
     let code = '';
 
     for (let i = 0; i < length; i++) {
         const randomIndex = Math.floor(Math.random() * characters.length);
         code += characters[randomIndex];
     }
 
     return code;
 }
module.exports = {

     resetPWD: (req, res) => {
          filePath = path.resolve(__dirname, '..', '..', 'pages', 'resetPWD.html');

          res.sendFile(filePath);
     },

     post: (req, res) => {
          var email = req.body.email;
          // console.log(email);
          var sql = "SELECT * FROM user_data WHERE email=?;";
          var sqlReset = "UPDATE user_data SET password=? WHERE email=?;"
          connhelper.query(sql, email, (err, results, fields) => {
               if (results) {
                    // 生成隨機亂碼
                    const newPassword = RandomPWD(8);

                    // 加密新密碼 下列變數要記得修改
                    // const hashedPassword = crypto.createHash('sha256').update(newPassword).digest('hex');
                    connhelper.query(sqlReset, [newPassword, email], (err, setDefaultPWD) => {
                         var options = {
                              //寄件者
                              from: "dailybuy0531@gmail.com",
                              //收件者
                              to: email,
                              //主旨
                              subject: "DailyBuy:您的帳戶密碼已經重置", // Subject line
                              //純文字
                              text: `親愛的 ${results[0].user_name}，
      
      請使用新的隨機密碼 "${newPassword}" 登入您的帳戶。
      為了保障您的帳戶安全，我們強烈建議您登入後立即變更密碼。
      
      如果您在變更密碼或登入時遇到任何問題，
      請聯繫我們的客戶支援團隊，我們將竭誠為您服務。
      
      祝您購物愉快！
      
      此郵件為系統自動發送，請勿回復。`
                              , // plaintext body
                         };
                         //發送信件方法
                         transporter.sendMail(options, function (error, info) {
                              if (error) {
                                   console.log(error);
                              } else {
                                   console.log("訊息發送: " + info.response);
                              }
                         });
                         res.json({ redirectUrl: '/login' });
                    })
               } else {
                    alert("此帳號不存在");
               }
          })

     },

}