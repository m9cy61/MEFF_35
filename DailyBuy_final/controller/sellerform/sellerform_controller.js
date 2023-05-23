const path = require('path');
const connhelper = require('../../config/database');
const files = require('../../module/multer_setting').files;
module.exports = {
     sellerform: (req, res) => {
          // console.log(req.session.user)
          res.sendFile(path.resolve(__dirname, '..', '..', 'pages', 'sellerform.html'))

     },
     upload: (req, res) => {
          // console.log('//////////////////')
          // console.log(req.session.user)
          // console.log('//////////////////');

          var maxId;

          connhelper.query('SELECT product_id FROM product_data ORDER BY product_id DESC LIMIT 1;', (err, results, fields) => {

               if (err) throw err;

               maxId = parseInt(results[0].product_id) + 1;
               
          var pic1 = files[0] ? `/media/product/user_${req.session.user.id}/${maxId}/${files[0].originalname}` : '';
          var pic2 = files[1] ? `/media/product/user_${req.session.user.id}/${maxId}/${files[1].originalname}` : '';
          var pic3 = files[2] ? `/media/product/user_${req.session.user.id}/${maxId}/${files[2].originalname}` : '';
          var pic4 = files[3] ? `/media/product/user_${req.session.user.id}/${maxId}/${files[3].originalname}` : '';

          // console.log(files)
          var sql_data = "INSERT INTO product_data(user_id,shop_name,product,country,shop_state, pic_url1, pic_url2, pic_url3, pic_url4,product_url,exp_date, product_type, product_intro,trade_state,start_date, end_date,trade_date,notefication, discount,spec1,spec1_price,spec2,spec2_price,spec3,spec3_price) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"

          //    console.log('/////////////////////////')
          //    console.log(req.body)
          //    console.log('/////////////////////////')
          connhelper.query(sql_data, [req.session.user.id, req.body.shop_name, req.body.product, req.body.country, req.body.shop_state,
               pic1,
               pic2,
               pic3,
               pic4, req.body.product_url, req.body.exp_date, req.body.product_type, req.body.product_intro, req.body.trade_state, req.body.start_date, req.body.end_date, req.body.trade_date, req.body.notefication, req.body.discount, req.body.spec1, req.body.spec1_price, req.body.spec2, req.body.spec2_price, req.body.spec3, req.body.spec3_price],

               function (err, result, fields) {
                    if (err) {
                         throw err;
                    } else {
                         console.log("upload完成");
                         // console.log(req.body.spec2);
                         res.send(result);
                    };
               });
          })

     },


}