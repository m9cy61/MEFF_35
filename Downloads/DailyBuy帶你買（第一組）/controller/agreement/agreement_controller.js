
const connhelper = require('../../config/database');
const path = require('path')
module.exports = {

     agreement: (req, res) => {

          let mysql_agreement =
               "SELECT `product_id` FROM `product_data` WHERE product_id =?;";
          connhelper.query(mysql_agreement, [req.body.pid], (err, results, fields) => {
               if (err) {
                    res.send("select發生錯誤", err.sqlMessage);
               } else {
                    const filePath = path.resolve(__dirname, '..', '..', 'pages', 'statement.html');
                    res.sendFile(filePath);
               }
          });

     },

     add_order: (req, res) => {

          let sql_add_order =
               "INSERT INTO `order_data` (`product_id`, `product_spec`, `price`, `user_id`, `user_name`, `address`) VALUES (?, ?, ?, ?, (SELECT `user_name` FROM `user_data` WHERE `user_id` = ?), (SELECT `address` FROM `user_data` WHERE `user_id` = ?));";
          connhelper.query(
               sql_add_order,
               [
                    req.body.pid,
                    req.body.product_name,
                    parseInt(req.body.product_price),
                    req.body.uid,
                    req.body.uid,
                    req.body.uid,
               ],
               (err, results) => {
                    if (err) {
                         console.log(err);
                    } else {
                         res.json(results);
                    }
               }
          );

     },


}