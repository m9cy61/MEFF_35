const path = require('path');
const connhelper = require('../../config/database');

module.exports = {
     wish: (req, res) => {
          res.sendFile(path.resolve(__dirname, '..', '..', 'pages', 'wish.html'))
     },

     insertwish: (req, res) => {

          var insert_form1 = "INSERT INTO wish_data(shop_name,user_id ,product,product_url,wish_end_date,memo,count)VALUES(?,?,?,?,?,?,0)"
          connhelper.query(insert_form1, [req.body.shop_name, req.session.user.id, req.body.product, req.body.product_url, req.body.wish_end_date, req.body.memo], function (err, result, fields) {
               if (err) {
                    throw err;
               } else {
                    console.log("願望清單新增完成");

                    res.send(result)

               };
          })

     },

     // select: (req, res) => {

     //      var select_data = "SELECT  wish_id ,user_id,shop_name,product, wish_end_date, count FROM wish_data"
     //      connhelper.query(select_data, (err, results, fields) => {
     //           if (err) {
     //                throw err;
     //           } else {
     //                // console.log("完成")
     //                // console.log(results)
     //                res.json(results)

     //           };
     //      })

     // },

     // wishcount: (req, res) => {

     //      console.log(req.body.id)
     //      var update = `UPDATE wish_data SET count = ? WHERE wish_id = ?`;
     //      connhelper.query(update, [req.body.count, req.body.id],
     //           function (err, result, fields) {
     //                if (err) {
     //                     throw err;
     //                } else {
     //                     console.log("wishcount完成")

     //                };
     //           })

     // },

     // collect: (req, res) => {

     //      var select_data = "SELECT * FROM wish_data WHERE user_id = 8;  "
     //      connhelper.query(select_data, (err, form3_result, fields) => {
     //           if (err) {
     //                throw err;
     //           } else {
     //                console.log("完成")
     //                // console.log(results)
     //                res.json(form3_result)

     //           };
     //      })

     // },

     //////////////////////////

     select: (req, res) => {

          var select_data = `SELECT  wish_id ,user_id,shop_name,product, wish_end_date, count FROM wish_data `
          connhelper.query(select_data, (err, results, fields) => {
               if (err) {
                    throw err;
               } else {
                    console.log("完成111")
                    // console.log(results)
                    res.json(results)

               };
          })

     },

     wishcount: (req, res) => {

          var update = `UPDATE wish_data SET count = ? WHERE wish_id = ?`;
          connhelper.query(update, [req.body.count, req.body.id],
               function (err, result, fields) {
                    if (err) {
                         throw err;
                    } else {
                         console.log("wishcount完成");
                         res.send(result);

                    };
               })

     },
     select1: (req, res) => {
          cc = req.body.id
          res.send("成功給值")

     },
     collect: (req, res) => {
          var select_data = `SELECT * FROM wish_data WHERE user_id = ?;`;

          connhelper.query(select_data, req.session.user.id, (err, form3_result, fields) => {
               if (err) {
                    throw err;
               } else {
                    console.log("完成")
                    // console.log(results)
                    // console.log('//////////////////////')
                    console.log(form3_result)
                    // console.log('//////////////////////')
                    res.json(form3_result)

               };
          })

     }

}