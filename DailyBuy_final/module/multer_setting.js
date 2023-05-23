const multer = require('multer');
const fs = require('fs');
const path = require('path');
const connhelper = require('../config/database');

//更新會員資料--------------------------------
var updateStorage = multer.diskStorage({
     destination: function (req, file, cb) {

          var dir = path.join(process.cwd(), `/public/media/member/${req.session.user.id}`);
          if (!fs.existsSync(dir)) {
               fs.mkdirSync(dir, { recursive: true });
          };
          //設定檔案路徑到cookie中
          req.session.user.pic = `/media/member/${req.session.user.id}/${file.originalname}`;
          cb(null, dir);
     },
     filename: function (req, file, cb) {
          cb(null, file.originalname)
     }
})
var upload_update = multer({ storage: updateStorage });

// 新增跟團表單------------------------------------
var file_array = [];

var seller_storage = multer.diskStorage({
     destination: async function (req, file, cb) {

          file_array.push(file);

          var maxId;

          connhelper.query('SELECT product_id FROM product_data ORDER BY product_id DESC LIMIT 1;', (err, results, fields) => {

               if (err) throw err;

               maxId = parseInt(results[0].product_id) + 1;
               var dir = path.join(process.cwd(), `/public/media/product/user_${req.session.user.id}/${maxId}`);
               if (!fs.existsSync(dir)) {
                    fs.mkdirSync(dir, { recursive: true });
               };



               cb(null, dir);

          })

     },
     filename: function (req, file, cb) {

          cb(null, file.originalname)
     }
});

var seller_upload = multer({ storage: seller_storage })



module.exports = {
     multer_for_update: upload_update.fields([
          { name: "user_name" },
          { name: "nick_name" },
          { name: "password" },
          { name: "birthday" },
          { name: "phone" },
          { name: "address" },
          { name: "user_intro" },
          { name: "selfie" },
     ]),

     multer_for_sellerform: seller_upload.fields([
          { name: 'pic_url', maxCount: 5 },
          { name: 'shop_name' },
          { name: 'product' },
          { name: 'country' },
          { name: 'shop_state' },
          { name: 'product_url' },
          { name: 'exp_date' },
          { name: 'product_type' },
          { name: 'product_intro' },
          { name: 'spec1' },
          { name: 'spec1_price' },
          { name: 'spec2' },
          { name: 'spec2_price' },
          { name: 'spec3' },
          { name: 'spec3_price' },
          { name: 'spec4' },
          { name: 'spec4_price' },
          { name: 'spec5' },
          { name: 'spec5_price' },
          { name: 'discount' },
          { name: 'discount_price' },
          { name: 'trade_way' },
          { name: 'pay_way' },
          { name: 'start_date' },
          { name: 'end_date' },
          { name: 'trade_date' },
          { name: 'notefication' }
     ]),

     files: file_array
};