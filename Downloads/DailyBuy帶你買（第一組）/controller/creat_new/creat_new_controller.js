
const connhelper = require('../../config/database');
const path=require('path')
module.exports = {

     create_new_order: (req, res) => {

          const filePath = path.resolve(__dirname, '..', '..', 'pages', 'create_new.html');
          res.sendFile(filePath);
         
     },

     creat_new_form:(req,res)=>{

          let sql_find = "SELECT * FROM `product_data` WHERE product_id=?;";
          connhelper.query(sql_find, [req.query.pid], (err, results1) => {
              if (err) {
                  console.log(err);
              } else {
                  // res.json(results1);
                  const results = Object.keys(results1).map((key) => results1[key]);
                  let product_data = results[0];
                  res.json(product_data);
              }
          });
     }

}