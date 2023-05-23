const path = require('path');
const connhelper = require('../../config/database');
const transporter = require('../../module/nodemailer')
module.exports = {
     product: (req, res) => {
          let mysql_pd = "select * from `product_data`;";
          let mysql_collete = "select * from `member_collectList`;";
          connhelper.query(mysql_pd, (err, results1, fields) => {
               if (err) {
                    res.send("select發生錯誤", err.sqlMessage);
               } else {
                    connhelper.query(mysql_collete, (err, results2, fields) => {
                         if (err) {
                              console.log(err);
                         } else {
                              //  console.log([results1, results2]);
                              res.sendFile(path.resolve(__dirname, '..', '..', 'pages', 'product.html'));
                         }
                    });
               }
          });
     },
     user_login: (req, res) => {
          // console.log(req.session.user)
          if (!req.session.user || !req.session.user.id) {
               return res.json("undefined");
          }
          var sql = "SELECT * FROM user_data WHERE user_id=?;";
          connhelper.query(sql, [req.session.user.id], (err, results, fields) => {
               if (err) {
                    res.json("沒東西");
               } else {
                    // console.log('//results[0]///////');
                    // console.log(results[0]);
                    // console.log('//results[0]///////');
                    res.json(results[0]);
               }
          });

     },
     product_id: (req, res) => {
          // console.log('//////////session/////////////////////')
          // console.log(req.session)
          // console.log('//////////session/////////////////////')
          const uid = req.session.user?.id;
          const pid = req.params.product_id;
          // console.log('////////////////uid pid///////////////////////')
          // console.log(uid + pid)
          // console.log('////////////////uid pid///////////////////////')
          const mysql_pd =
               "SELECT `product_id`, `user_id`, `shop_name`, `product`, `country`, `shop_state`, `pic_url1`, `pic_url2`, `pic_url3`, `pic_url4`, `product_url`, `exp_date`, `product_type`, `spec1`, `spec1_price`, `spec2`, `spec2_price`, `spec3`, `spec3_price`, `product_intro`, `trade_state`, `start_date`, DATE_FORMAT(`end_date`,'%Y/%m/%d')end_date , `trade_date`, `notefication`, `discount` FROM `product_data` WHERE product_id=?;";
          const mysql_collete_list =
               "SELECT * FROM `member_collectList` WHERE product_id=? AND user_id=?;";
          connhelper.query(mysql_pd, [pid], (err, results1, fields) => {
               if (err) {
                    res.send("select發生錯誤", err.sqlMessage);
               } else {
                    const results = Object.keys(results1).map((key) => results1[key]);
                    const productData = results;
                    if (uid) {
                         connhelper.query(mysql_collete_list, [pid, uid], (err, results2) => {
                              if (err) {
                                   console.log(err);
                                   res.json(productData);
                              } else {
                                   const collectList = results2;
                                   const result = { productData, collectList };
                                   // console.log('///////////////////')

                                   // console.log(result);
                                   // console.log('///////////////////')
                                   res.json(result);
                              }
                         });
                    } else {
                         res.json(productData);
                    }
               }
          });

     },
     add_to_favorites: (req, res) => {
          // console.log('add_to_favorites')
          // console.log(req.body)
          let mysql_add_favor =
               "INSERT INTO `member_collectList`(`user_id`, `product_id`) VALUES (?,?);";
          connhelper.query(
               mysql_add_favor,
               [req.body.uid, req.body.pid],
               (err, results, fields) => {
                    if (err) {
                         // console.log(err);
                         // console.log(req.body.pid);
                         res.send("select發生錯誤" + err.sqlMessage);
                    } else {
                         // console.log(results);
                         res.send(results);
                    }
               }
          );

     },
     remove_from_favorites: (req, res) => {
          // console.log('remove_from_favorites');
          // console.log(req.body)
          let mysql_remove_favor =
               "DELETE FROM `member_collectList` WHERE product_id =? AND user_id = ?;";
          connhelper.query(mysql_remove_favor, [req.body.pid, req.body.uid], (err, results, fields) => {
               if (err) {
                    res.send("select發生錯誤" + err.sqlMessage);
               } else {
                    console.log(results);
                    console.log(fields);
                    res.send(results)
               }
          })
               ;

     },
     email: (req, res) => {
          if (!req.session.user) {
               res.send('請先登入')
          } else {
               uid = req.session.user.id;
               pid = req.body.pid;
               pname = req.body.pname;
               message = req.body.message;
               let send_email =
                    "SELECT u1.email AS email1, u2.email AS email2, p.shop_name, p.product, p.user_id FROM product_data p JOIN user_data u1 ON p.user_id = u1.user_id JOIN user_data u2 ON u2.user_id = ? WHERE p.product_id = ?;";
               connhelper.query(
                    send_email,
                    [uid, req.body.pid],
                    (err, results, fields) => {
                         if (err) {
                              res.send("select發生錯誤" + err.sqlMessage);
                         } else {
                              console.log('email')
                              console.log(results);
                              var options = {
                                   //寄件者
                                   from: "dailybuy0531@gmail.com",
                                   //收件者
                                   to: results[0].email1,
                                   // to: "minho5200421@gmail.com",
                                   //主旨
                                   subject: `來自DailyBuy帶你買，所發送的商品詢問信件`,
                                   //嵌入 html 的內文
                                   html: `<h2>商品：${results[0].shop_name + results[0].product
                                        }，問題信件</h2><br>
                <h3>請團主回信至會員:${uid} <br> email為:${results[0].email2}</h3><br>,
                <h4>問題內容如下：${message}</h4>`,
                              };
                              transporter.sendMail(options, (error, info) => {
                                   if (error) {
                                        console.log(error);
                                        res.send("郵件發送失敗" + error.message);
                                   } else {
                                        console.log("郵件已成功發送：" + info.response);
                                        res.send("郵件已成功發送");
                                   }
                              });
                         }
                    }
               );
          };

     },



}