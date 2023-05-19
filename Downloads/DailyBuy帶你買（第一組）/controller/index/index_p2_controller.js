var connhelper = require('../../config/database')

const controller = (req, res) => {
     var sql = "SELECT UD.nick_name	,pd.product_id,pd.shop_name, pd.product, DATE_FORMAT(pd.end_date, '%Y/%m/%d') AS end_date, pd.product_intro,pd.pic_url1, pd.user_id FROM product_data AS pd INNER JOIN user_data AS ud ON pd.user_id = ud.user_id WHERE PD.country = ?";
     connhelper.query(sql, req.params.county, (err, results, fields) => {
          if (!err) {
               res.json(results);
          } else {
               res.json(err.sqlMessage)
          }
     })
};

module.exports = controller;
