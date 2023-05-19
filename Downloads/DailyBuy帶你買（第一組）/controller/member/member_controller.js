const path = require('path');
const connhelper = require('../../config/database')
module.exports = {

     member: (req, res) => {
          console.log(req.session.user)
          // console.log('/member被呼叫')
          let filePath;

          filePath = path.resolve(__dirname, '..', '..', 'pages', 'member.html');

          res.sendFile(filePath);
     },

     info: (req, res) => {
          // console.log('/member/info被呼叫')
          // console.log('info_c')
          var sql = "SELECT user_id , email, user_name , nick_name , DATE_FORMAT(birthday, '%Y-%m-%d') AS birthday , phone , address , user_intro , selfie FROM `user_data` WHERE user_id=?;"
          connhelper.query(sql, req.session.user.id, (err, results, fields) => {
               var server_to_client = [results, { session: req.session.user }]
               res.json(server_to_client);
          });

     },

     follower: (req, res) => {
          // console.log('/member/follower被呼叫')
          var sql = "SELECT `order_data`.`user_id`,`order_data`.`product_id`,shop_name,product,pic_url1,DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,shipping_status FROM `order_data` JOIN `product_data` ON `order_data`.`product_id` = `product_data`.`product_id` WHERE `order_data`.`user_id` = ?;"

          connhelper.query(sql, req.session.user.id, (err, results, fields) => {

               // if (err) { console.log(err) } else { console.log(results) }

               res.json(results);
          })
     },

     follower_modal: (req, res) => {

          // console.log("follower:" + req.body.product_id);
          var sql = "SELECT `order_data`.`product_id`,pic_url1,country,shop_name,product,DATE_FORMAT(trade_date, '%Y-%m-%d') AS trade_date,DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date,exp_date,product_spec,price,quantity,`product_data`.`user_id`,`user_data`.`nick_name`,`user_data`.`selfie`,shipping,pay_way,`order_data`.`user_name` AS order_user , shipping_status FROM order_data JOIN product_data ON `order_data`.`product_id` = `product_data`.`product_id` JOIN user_data ON `product_data`.`user_id` = `user_data`.`user_id` WHERE `order_data`.`user_id` = ? AND `order_data`.`product_id` = ?;"
          connhelper.query(sql, [req.session.user.id, req.body.product_id], (err, results, fields) => {
               // if (err) { console.log(err) } else { console.log(results) }
               res.json(results);
          })
     },

     leader: (req, res) => {
          // console.log('/member/leader被呼叫')
          var sql = "SELECT product_id,shop_name,pic_url1,product,DATE_FORMAT(end_date, '%Y-%m-%d') AS end_date FROM `product_data` WHERE user_id = ?;"
          connhelper.query(sql, req.session.user.id, (err, results, fields) => {
               res.json(results);
          })
     },

     leader_modal: (req, res) => {
          // console.log("leader:" + req.session.user.id);
          // console.log("leader:" + req.body.product_id);
          var sql = "SELECT `order_data`.`user_id`,`order_data`.`user_name`,`order_data`.`product_id`,product_spec,price,address,quantity,pay_way,shipping, shipping_status,DATE_FORMAT(trade_date, '%Y-%m-%d') AS trade_date FROM order_data JOIN `product_data` ON `product_data`.`product_id` = `order_data`.`product_id` WHERE `product_data`.`user_id` = ? AND `order_data`.`product_id` = ?;"
          connhelper.query(sql, [req.session.user.id, req.body.product_id], (err, results, fields) => {
               // if (err) { console.log(err) } else { console.log(results) }
               res.json(results);
          })
     },

     leader_update: (req, res) => {
          var { orderIds } = req.body;
          // console.log(orderIds);
          var sql = "UPDATE `order_data` SET shipping_status = 1 WHERE product_id = ? AND user_id IN (?);";
          // console.log(req.body.product_id)
          connhelper.query(sql, [req.body.product_id, orderIds], (err, results, fields) => {
               // if (err) { console.log(err) } else { console.log(results) }
               res.json(results);
          })
     },

     update: async (req, res) => {

          var sql = "UPDATE user_data SET user_name = IFNULL(?, user_name), nick_name = IFNULL(?, nick_name), password = IFNULL(?, password), birthday = IFNULL(STR_TO_DATE(?, '%Y-%m-%d'), birthday), phone = IFNULL(?, phone), address = IFNULL(?, address), user_intro = IFNULL(?, user_intro), selfie = IFNULL(?, selfie) WHERE user_id = ?;";
          var selfie = req.session.user.pic;
          connhelper.query(sql, [req.body.user_name || null, req.body.nick_name || null, req.body.password || null, req.body.birthday || null, req.body.phone || null, req.body.address || null, req.body.user_intro || null, selfie, req.session.user.id],
               (err, results, fields) => {
                    if (err) {
                         console.error(err);

                    } else {
                         console.log("資料更新完成");

                         res.json(req.session)
                    }
               })
     },



}