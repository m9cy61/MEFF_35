var express = require("express");
var session = require("express-session");
const bodyParser = require("body-parser");
var nodemailer = require("nodemailer");

var app = express();
var cors = require("cors");
// 設定cors開放的路徑
// var setting = {
//   origin: ["http://127.0.0.1:5502"],
// };
var setting = {
  origin: ["http://localhost:3001"],
};

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors(setting));

//設定資料庫
app.listen(3000, () => {
  console.log("server start");
});
//設定session路徑
app.use(
  session({
    secret: "applebanana",
    resave: true,
    saveUninitialized: true,
    cookie: {
      path: "/",
      httpOnly: true,
      secure: false,
      maxAge: 100 * 600 * 1000,
    },
  })
);
//開放路徑
app.use(express.static(__dirname + "/public"));

//連接資料庫
var sql = require("mysql");
var sqlconn = sql.createConnection({
  host: "127.0.0.1",
  port: "8889",
  user: "root",
  password: "root",
  database: "buy2_database",
});
sqlconn.connect(function (error, yes) {
  if (error) {
    console.log("資料庫連線錯誤", error.sqlMessage);
  } else {
    console.log("資料庫連線成功");
  }
});
/*=======================================================================*/
// 註冊頁面請求
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/register.html");
});

// 登入頁面請求
app.get("/login", (req, res) => {
  res.sendFile(__dirname + "/login.html");
  // if (req.session.user) {
  //     res.redirect('/member');
  // } else {
  //     res.sendFile(__dirname + '/login.html');
  // }
});

// 會員中心頁面請求
app.get("/member", (req, res) => {
  // res.sendFile(__dirname + '/member.html');
  if (req.session.user) {
    res.sendFile(__dirname + "/member.html");
    console.log("member請求:" + req.session.user.id);
  } else {
    res.redirect("/login");
  }
});

// 忘記密碼頁面請求
app.get("/resetPWD", (req, res) => {
  res.sendFile(__dirname + "/resetPWD.html");
});

// 註冊頁面:接收註冊頁面帳號密碼insert到資料庫
app.post("/register", (req, res) => {
  var sql = "INSERT INTO user_data (email,password)VALUES(?,?);";
  sqlconn.query(
    sql,
    [req.body.email, req.body.password],
    (err, results, fields) => {
      console.log(results);
      console.log(err);
      res.json({ redirectUrl: "/login" });
    }
  );
  // console.log("email"+req.body.email)
  // console.log("password"+req.body.password)
});

// 登入頁面:從資料庫select出來給前端比對
app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  console.log(email);
  console.log(password);
  var sql = "SELECT * FROM user_data WHERE email=? and password=?;";
  sqlconn.query(sql, [email, password], (err, results, fields) => {
    console.log(results);
    if (results.length > 0) {
      let isMatched = false;
      results.forEach((user) => {
        console.log(user.email);
        console.log(user.password);
        if (user.email === email && user.password === password) {
          isMatched = true;
          req.session.user = {
            id: user.user_id,
            email: user.email,
            user_name: user.user_name,
          };
          console.log("登入成功");
          console.log(req.session.user);
        }else{
          req.session.user={
            id: "",
            email:"",
            user_name: "",
          }
        }
      });
      if (isMatched) {
        res.json({ redirectUrl: "/member" });
      }
    }
  });
});

// 忘記密碼頁面:前端送帳號過來比對資料庫的帳號
app.post("/resetPWD", (req, res) => {
  var email = req.body.email;
  console.log(email);
  var sql = "SELECT * FROM user_data WHERE email=?;";
  var sqlReset = "UPDATE user_data SET password='0000' WHERE email=?;";
  sqlconn.query(sql, email, (err, results, fields) => {
    if (results) {
      connhelper.query(sqlReset, email, (err, setDefaultPWD) => {
        res.json({ redirectUrl: "/login" });
      });
    } else {
      alert("此帳號不存在");
    }
  });
});

// 登出
app.post("/logout", (req, res) => {
  // console.log(req.session)
  req.session.destroy();
  res.json({ redirectUrl: "/login" });
});

// 會員中心:基本資料
app.post("/member/info", (req, res) => {
  // console.log("info:"+req.session.user.id)
  var sql = "SELECT * FROM user_data WHERE user_id=?;";
  sqlconn.query(sql, req.session.user.id, (err, results, fields) => {
    // console.log(results);
    res.json(results);
  });
});
// 判斷是否有會員登錄
app.get("/userlogin", function (req, res) {
  if (!req.session.user || !req.session.user.id) {
    return res.json("undefined");
  }
  var sql = "SELECT * FROM user_data WHERE user_id=?;";
  sqlconn.query(sql,req.session.user.id, (err, results, fields) => {
    if(err){
      res.json("沒東西");
    }else{
      res.json(results[0]);
      // console.log(results[0]);
    }
  });
});

/*=======================================================================*/
// 將資料庫的商品資訊撈出來，呈現在畫面上

app.get("/product", function (req, res) {
  let mysql_pd = "select * from `product_data`;";
  let mysql_collete = "select * from `member_collectList`;";
  sqlconn.query(mysql_pd, (err, results1, fields) => {
    if (err) {
      res.send("select發生錯誤", err.sqlMessage);
    } else {
      sqlconn.query(mysql_collete, (err, results2, fields) => {
        if (err) {
          console.log(err);
        } else {
          //  console.log([results1, results2]);
          res.sendFile(__dirname + "/daily_buy_product.html");
        }
      });
    }
  });
});
// 取得商品資料+許願清單的資料

app.get("/product/:product_id", function (req, res) {
  const uid = req.session.user?.id;
  const pid = req.params.product_id;
  const mysql_pd =
    "SELECT `product_id`, `user_id`, `shop_name`, `product`, `country`, `shop_state`, `pic_url1`, `pic_url2`, `pic_url3`, `pic_url4`, `product_url`, `exp_date`, `product_type`, `spec1`, `spec1_price`, `spec2`, `spec2_price`, `spec3`, `spec3_price`, `product_intro`, `trade_state`, `start_date`, DATE_FORMAT(`end_date`,'%Y/%m/%d')end_date , `trade_date`, `notefication`, `discount` FROM `product_data` WHERE product_id=?;";
  const mysql_collete_list =
    "SELECT * FROM `member_collectList` WHERE product_id=? AND user_id=?;";
  sqlconn.query(mysql_pd, [pid], (err, results1, fields) => {
    if (err) {
      res.send("select發生錯誤", err.sqlMessage);
    } else {
      const results = Object.keys(results1).map((key) => results1[key]);
      const productData = results;
      if (uid) {
        sqlconn.query(mysql_collete_list, [pid, uid], (err, results2) => {
          if (err) {
            console.log(err);
            res.json(productData);
          } else {
            const collectList = results2;
            const result = { productData, collectList };
            console.log(result);
            res.json(result);
          }
        });
      } else {
        res.json(productData);
      }
    }
  });
});


let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "dailybuy0531@gmail.com",
    pass: "vumyhusgwckfqlqu",
  },
});
app.post("/product/send-email", (req, res) => {
  uid = req.session.user.id;
  pid = req.body.pid;
  pname = req.body.pname;
  message = req.body.message;
  let send_email =
    "SELECT u1.email AS email1, u2.email AS email2, p.shop_name, p.product, p.user_id FROM product_data p JOIN user_data u1 ON p.user_id = u1.user_id JOIN user_data u2 ON u2.user_id = ? WHERE p.product_id = ?;";
  sqlconn.query(
    send_email,
    [req.body.uid, req.body.pid],
    (err, results, fields) => {
      if (err) {
        res.send("select發生錯誤" + err.sqlMessage);
      } else {
        console.log(results);
        var options = {
          //寄件者
          from: "dailybuy0531@gmail.com",
          //收件者
          to: results[0].email1,
          //主旨
          subject: `來自DailyBuy帶你買，所發送的商品詢問信件`,
          //嵌入 html 的內文
          html: `<h2>商品：${
            results[0].shop_name + results[0].product
          }，問題信件</h2><br>
        <h2>請團主回信至會員ID:${uid} <br> email為${results[0].email2}</h2><br>
        <h2>問題內容如下：${message}</h2>`,
        };
        transporter.sendMail(options, (error, info) => {
          if (error) {
            console.log(error);
            res.send("郵件發送失敗");
          } else {
            console.log("郵件已成功發送：" + info.response);
            res.send("郵件已成功發送");
          }
        });
      }
    }
  );
});

// 將產品新增到收藏清單內
app.post("/add-to-favorites", function (req, res) {
  let mysql_add_favor =
    "INSERT INTO `member_collectList`(`user_id`, `product_id`) VALUES (?,?);";
  sqlconn.query(
    mysql_add_favor,
    [req.body.uid, req.body.pid],
    (err, results, fields) => {
      if (err) {
        // console.log(err);
        console.log(req.body.pid);
        res.send("select發生錯誤" + err.sqlMessage);
      } else {
        console.log(results);
        //  res.send(results);
      }
    }
  );
});
// 將產品移除收藏清單
app.delete("/remove-to-favorites", function (req, res) {
  let mysql_remove_favor =
    "DELETE FROM `member_collectList` WHERE product_id =?;";
  sqlconn.query(mysql_remove_favor, [req.body.pid]),
    (err, results, fields) => {
      if (err) {
        res.send("select發生錯誤" + err.sqlMessage);
      } else {
        console.log(results);
        console.log(fields);
      }
    };
});

//跟團之後的同意說明表單
app.get("/agreement", function (req, res) {
  let mysql_agreement =
    "SELECT `product_id` FROM `product_data` WHERE product_id =?;";
  sqlconn.query(mysql_agreement, [req.body.pid], (err, results, fields) => {
    if (err) {
      res.send("select發生錯誤", err.sqlMessage);
    } else {
      res.sendFile(__dirname + "/statement.html");
    }
  });
});
// 將產品資料新增到訂單資料庫
app.post("/add_order", function (req, res) {
  let sql_add_order =
    "INSERT INTO `order_data` (`product_id`, `product_spec`, `price`, `user_id`, `user_name`, `address`) VALUES (?, ?, ?, ?, (SELECT `user_name` FROM `user_data` WHERE `user_id` = ?), (SELECT `address` FROM `user_data` WHERE `user_id` = ?));";
  sqlconn.query(
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
        console.log("產生錯誤" + err);
      } else {
        console.log(results);
      }
    }
  );
});
app.get("/create_new", (req, res) => {
  let sql_form = "SELECT * FROM `product_data` WHERE product_id=?;";
  console.log(req.body.pid);
  // sqlconn.query(sql_form,[req.body.pid],(err,results)=>{
  //   console.log(results);
  res.sendFile(__dirname + "/create_new.html");
  // })
});
app.get("/creat_new_form", (req, res) => {
  let sql_find = "SELECT * FROM `product_data` WHERE product_id=?;";
  sqlconn.query(sql_find, [req.query.pid], (err, results1) => {
    if (err) {
      console.log(err);
    } else {
      // res.json(results1);
      const results = Object.keys(results1).map((key) => results1[key]);
      let product_data = results[0];
      res.json(product_data);
    }
  });
});

app.post("/new_order", (req, res) => {
  let add_productorder = "insert into ";
});
