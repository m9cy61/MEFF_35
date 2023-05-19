const path = require('path');
const connhelper = require('../../config/database');

module.exports = {
     top_members: (req, res) => {

          res.sendFile(path.resolve(__dirname, '..', '..', 'pages', 'topMember.html'))

     },
     cards: (req, res) => {
          var sql = `SELECT 
          rank_value,
          product_id,
          shop_name,
          product,
          country,
          pic_url1,
          pic_url2,
          pic_url3,
          pic_url4,
          exp_date,
          product_type,
          end_date,
          trade_date,
          user_id,
          email,
          user_name,
          nick_name,
          birthday,
          selfie,
          address,
          order_count,
          other_product_ids
      FROM (
          SELECT 
              (@rank := @rank + 1) AS rank_value,
              p.product_id,
              p.shop_name,
              p.product,
              p.country,
              p.pic_url1,
              p.pic_url2,
              p.pic_url3,
              p.pic_url4,
              DATE_FORMAT(p.exp_date, '%Y/%m/%d') AS exp_date,
              p.product_type,
              p.end_date,
              DATE_FORMAT(p.trade_date, '%Y/%m/%d') AS trade_date,
              u.user_id,
              u.email,
              u.user_name,
              u.nick_name,
              DATE_FORMAT(u.birthday, '%Y/%m/%d') AS birthday,
              u.selfie,
              u.address,
              COUNT(o.user_id) AS order_count,
              GROUP_CONCAT(p.product_id) AS other_product_ids
          FROM product_data p
          JOIN user_data u ON p.user_id = u.user_id
          LEFT JOIN order_data o ON p.product_id = o.product_id
          CROSS JOIN (SELECT @rank := 0) AS r
          GROUP BY p.product_id,p.shop_name, p.product, p.country, p.pic_url1, p.pic_url2, p.pic_url3, p.pic_url4, p.exp_date, p.product_type, p.end_date, p.trade_date, u.user_id, u.email, u.user_name, u.nick_name, u.birthday, u.selfie, u.address
          ORDER BY order_count DESC
          LIMIT 3
      ) AS ranked_data;
      `;
          connhelper.query(sql, (err, results, fields) => {
               if (err) {
                    console.error('獲取失敗：', err);
               } else {
                    res.json(results);
               }
          });
     }

}