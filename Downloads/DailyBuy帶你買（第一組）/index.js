var express = require('express');
var cors = require('cors');
var session = require('./module/session.js');
var app = express();
var cors = require('./module/cors.js');
var bodyParser = require('body-parser');
var connhelper = require('./config/database.js');
var index_router = require('./router/index/index-router.js');
var index_p2_router = require('./router/index/index_p2_router.js');
var index_p3_g1_router = require('./router/index/index_p3_g1_router.js');
var index_p3_g2_router = require('./router/index/index_p3_g2_router.js');
var instruction_router = require('./router/instruction/instruction_router.js');
var news_router = require('./router/news/news_router');
var about_us_router = require('./router/about_us/about_us.js');
var register_router = require('./router/member/register_router.js');
var login_router = require('./router/member/login_router.js');
var resetPWD_router = require('./router/member/resetPWD_router.js');
var member_router = require('./router/member/member_router.js');
var product_router = require('./router/product/product_router.js');
var agreement_router = require('./router/agreement/agreement_router.js');
var creat_new_router = require('./router/creat_new/creat_new_router.js');
var sellerform_router = require('./router/sellerform/sellerform_router.js');
var wish_router = require('./router/wish/wish_router.js');
var payment_router = require('./router/payment/payment_router.js');
var all_products_router = require('./router/all_product/all_product_router.js');
var top_members_router = require('./router/top_members/top_members_router.js');

//-----------------------
// 設定資料庫連線
connhelper.connect((err) => {
  if (!err) {
    console.log('資料庫連線成功');
  } else {
    console.log('資料庫連線失敗' + err.sqlMessage ? err.sqlMessage : err);
  }
});

//設定公開資料夾

app.use(express.static(__dirname + '/public'));

//設定客戶端連結伺服器端授權

app.use(cors);

//設定編碼方式
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

//cookie設定
app.use(session);

//首頁-------------------------------------------

app.use('/', index_router);
app.use('/index', index_router);
app.use('/part2', index_p2_router);                  //首頁第二部分
app.use('/part3/group1', index_p3_g1_router);        //首頁第三部分-群組1
app.use('/part3/group2', index_p3_g2_router);        //首頁第三部分-群組2

//使用教學---------------------------------------

app.use('/instruction', instruction_router);

//最新消息---------------------------------------

app.use('/news', news_router);

//關於我們---------------------------------------

app.use('/about_us', about_us_router);

//會員 -----------------------------------------

app.use('/register', register_router.register);      // 註冊頁面
app.use('/register', register_router.post);          // 註冊頁面:接收註冊頁面帳號密碼insert到資料庫
app.use('/login', login_router.login);               // 登入頁面
app.use('/login', login_router.post);                // 登入頁面:從資料庫select出來給前端比對
app.use('/', resetPWD_router.resetPWD);              // 忘記密碼
app.use('/', resetPWD_router.post);                  // 忘記密碼:前端送帳號過來比對資料庫的帳號
app.use('/', login_router.google);                   // google登入
app.use('/', login_router.logout);                   // 登出
app.use('/', member_router.update);                  // 會員中心:更新基本資料
app.use('/member', member_router.follower);          // 會員中心:跟團者介面
app.use('/member', member_router.info);              // 會員中心:基本資料
app.use('/member', member_router.leader);            // 會員中心:開團者介面
app.use('/member', member_router.member);            // 會員頁面
app.use('/', member_router.follower_modal);          // 會員中心:跟團者訂單對話框
app.use('/', member_router.leader_modal);            // 會員中心:開團者訂單對話框
app.use('/', member_router.leader_update);           // 會員中心:開團者訂單 出貨狀態更新

//商品 -----------------------------------------

app.use('/', product_router.product);
app.use('/', product_router.user_login);             // 判斷使用者是否登入
app.use('/', product_router.product_id);             // 取得商品資料+許願清單的資料
app.use('/', product_router.email);                  // 給團主寄信
app.use('/', product_router.add_to_favorites);       // 將產品新增到收藏清單內
app.use('/', product_router.remove_from_favorites);  // 將產品移除收藏清單

//免責聲明---------------------------------------

app.use('/', agreement_router.agreement);            //跟團之後的同意說明表單
app.use('/', agreement_router.add_order);            // 將產品資料新增到訂單資料庫

//開新團-----------------------------------------

app.use('/', creat_new_router.create_new_order);     //新團頁面
app.use('/', creat_new_router.creat_new_form);       //取得預填資料

//開團表單---------------------------------------
app.use('/', sellerform_router.sellerform);          //取得開團表單頁面
// app.use('/', sellerform_router.session);             //記錄到session
app.use('/', sellerform_router.upload);              //上傳到伺服器內

//許願清單---------------------------------------

app.use('/wish', wish_router.wish);                  //我要許願頁面
app.use('/wish', wish_router.insertwish);            // insert資料進資料庫
app.use('/wish', wish_router.select);                // get 願望清單到表上
app.use('/wish', wish_router.wishcount);             // count+1
app.use('/wish', wish_router.collect);               // get 收藏清單到表上
app.use('/wish',wish_router.select1);

//付款頁面---------------------------------------

app.use('/payment', payment_router.payment);         //取得付款頁面
app.use('/payment', payment_router.card);            //商品卡片所需資料Ver-axios
app.use('/payment', payment_router.date);            //開團結帳日期相關
app.use('/payment', payment_router.success);         //付款成功頁面
app.use('/', payment_router.put);                    //開團結帳表單insert

//所有商品頁面--------------------------------------

app.use('/allProducts', all_products_router.all_product); //取得所有商品頁面
app.use('/allProducts', all_products_router.search);      //搜尋功能
app.use('/allProducts', all_products_router.cards);       // 導入商品及會員資料庫
app.use('/allProducts', all_products_router.favorites);   // 導入收藏資料庫(商品+會員)
app.use('/allProducts', all_products_router.history);     // 開團履歷

// 精選團主頁面

app.use('/', top_members_router.top_members);             //精選團主頁面
app.use('/topMember', top_members_router.cards);          //獲得卡片資料


// port號:3000
app.listen(3000, () => {

  console.log('伺服器執行中');

});