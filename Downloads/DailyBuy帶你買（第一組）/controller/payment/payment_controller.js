const path = require('path');
const connhelper = require('../../config/database');

module.exports = {
     payment: (req, res) => {
          res.sendFile(path.resolve(__dirname, '..', '..', 'pages', 'payment.html'))
     },

     card: (req, res) => {
          var sql = `SELECT p.product_id, p.user_id, p.shop_name, p.product, p.country, p.shop_state, p.pic_url1, p.pic_url2, p.pic_url3, p.pic_url4, p.product_url, p.exp_date, p.product_type, p.product_intro, p.trade_state, p.start_date, p.end_date, p.trade_date, p.notefication, p.discount, p.spec1, p.spec1_price, u.email, u.user_name, u.nick_name,u.selfie FROM product_data p JOIN user_data u ON p.user_id = u.user_id WHERE p.product_id = ?; `;
          connhelper.query(sql, req.params.pid, (err, results, fields) => {
               res.json(results);
          })
     },

     date: (req, res) => {

          var sql2 = `SELECT user_id, DATE_FORMAT(end_date, '%Y/%m/%d') AS end_date_v2,DATE_FORMAT(trade_date, '%Y/%m/%d') AS trade_date_v2,exp_date from product_data where product_id=?;`
          connhelper.query(sql2, req.params.pid, (err, results, fields) => {
               res.json(results);
          });
     },

     success: (req, res) => {
          res.sendFile(path.resolve(__dirname, '..', '..', 'pages', 'success.html'))
     },

     put: (req, res) => {

          var sql = "UPDATE order_data SET user_name = ?, shipping = ?, address = ?, product_spec = ?, price = ?, quantity = ?, pay_way = ?, credit_card = ? WHERE product_id = ? AND user_id = ?;"
          var data = [req.body.user_name, req.body.shipping, req.body.address, req.body.product_spec, req.body.product_price, req.body.quantity, req.body.pay_way, req.body.credit_card, req.body.product_id, req.body.user_id]
          connhelper.query(sql, data, function (err, results, fields) {

               if (err) {
                    console.log(err)
               } else {
                    //     console.log(results);
                    res.json(results)
               }
          })
     }

}