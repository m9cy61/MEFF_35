const path = require('path');
const connhelper = require('../../config/database')
module.exports = {

     all_product: (req, res) => {
          filePath = path.resolve(__dirname, '..', '..', 'pages', 'allProducts.html');
          res.sendFile(filePath);
     },

     search: (req, res) => {

          // 從HTTP請求中獲取搜尋字串
          const search = req.params.search;
          const sql = `SELECT 
 product_data.product_id, 
 product_data.user_id, 
 product_data.shop_name, 
 product_data.product, 
 product_data.country, 
 product_data.product_type, 
 product_data.pic_url1, 
 product_data.spec1_price, 
 product_data.spec3_price, 
 product_data.end_date, 
 DATE_FORMAT(product_data.end_date, '%Y-%m-%d') AS end_date2, 
 DATE_FORMAT(user_data.birthday, '%Y-%m-%d') AS birthday2, 
 user_data.email, 
 user_data.user_name, 
 user_data.nick_name ,
 user_data.selfie
FROM 
 product_data 
JOIN user_data 
   ON product_data.user_id = user_data.user_id
    WHERE shop_name LIKE '%${search}%' OR product LIKE '%${search}%'  OR nick_name LIKE '%${search}%'`;
          connhelper.query(sql, (err, results, fields) => {
               if (err) throw err;
               res.send(results);
          });

     },

     card: (req, res) => {
          var sql = `SELECT p.product_id, p.shop_name, p.product, p.country, p.pic_url1, DATE_FORMAT(p.exp_date, '%Y/%m/%d') AS exp_date, p.product_type, p.end_date, DATE_FORMAT(p.trade_date, '%Y/%m/%d') AS trade_date,  p.spec1_price, p.spec2_price, p.spec3_price, u.email, u.user_name, u.nick_name, DATE_FORMAT(u.birthday, '%Y/%m/%d') AS birthday, u.selfie, u.address, p.user_id FROM product_data AS p INNER JOIN user_data AS u ON p.user_id = u.user_id ;`;
          var sql_colletelist = `SELECT * FROM member_collectList WHERE product_id=? AND user_id=?;`;
          connhelper.query(sql, sql_colletelist, (err, results, fields) => {
               if (!err) {
                    res.json(results);
               }
               else {
                    console.log(err);
                    res.send(err.sqlMessage)
               };
          });
     },

     favorites: (req, res) => {

          if (!req.session.user || !req.session.user.id) {
               return res.json("undefined");
          }
          const userId = req.session.user.id;
          var sql_fr = 'SELECT * FROM member_collectlist WHERE user_id = ?';
          connhelper.query(sql_fr, userId, (err, results) => {
               if (err) {
                    console.error('獲取收藏商品失敗：', err);
                    res.status(500).json({ error: '獲取收藏商品失敗' });
               } else {
                    const favoriteProducts = results.map((row) => row.product_id);
                    res.json(favoriteProducts);
               };
          });
     },

     history: (req, res) => {


          var sql = "SELECT user_id, product_id, shop_name, product, MAX(order_count) AS order_count FROM (SELECT pd.user_id, pd.product_id, pd.shop_name, pd.product, COUNT(od.product_id) AS order_count FROM product_data AS pd JOIN order_data AS od ON pd.product_id = od.product_id WHERE pd.user_id = ? GROUP BY pd.user_id, pd.product_id, pd.shop_name, pd.product UNION SELECT pd.user_id, pd.product_id, pd.shop_name, pd.product, NULL AS order_count FROM product_data AS pd WHERE pd.user_id = ? ) AS merged_data GROUP BY user_id, product_id, shop_name, product;";
          connhelper.query(sql, [req.params.id, req.params.id], (err, results, field) => {
               if (!err) {
                    // console.log(results);
                    res.json(results);
               } else {
                    console.log(err);
                    res.send(err)
               }

          })

     }
}