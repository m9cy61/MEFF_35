// 2023/05/05 google登入------------------

//登入後執行解碼JWT
async function onSignIn1(x) {
  // 將編碼後的payload部分進行URL安全編碼解碼
  var base64Url = x.credential.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var payload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  var user_info = JSON.parse(payload);
  var data_to_server = user_info;
  var google_login_results = await axios.post("/google_login", data_to_server)

  console.log(google_login_results);

  if (google_login_results.data === '註冊成功' || google_login_results.data === '登入成功') {

    Swal.fire(
      '登入成功',
      'Welcome to DailyBuy~',
      'success'
    );
    setTimeout(() => {
      window.location.href = '/member';
    }, 1000)

  } else {

    Swal.fire(
      '登入失敗',
      '請向相關人員聯絡',
      'warning'
    );

  }

};


// 2023/05/05 google登入--------------------
// 2023/05/06 facebook登入------------------

window.fbAsyncInit = function () {
  FB.init({
    appId: "2897398497059006",
    xfbml: true,
    version: "v2.0",
  });
};

(function (d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
  console.log("statusChangeCallback");
  console.log(response); //登入驗證資訊
  // The response object is returned with a status field that lets the
  // app know the current login status of the person.
  // Full docs on the response object can be found in the documentation
  // for FB.getLoginStatus().
  if (response.status === "connected") {
    // Logged into your app and Facebook.
    testAPI();
  } else if (response.status === "not_authorized") {
    // The person is logged into Facebook, but not your app.
    document.getElementById("status").innerHTML =
      "Please log " + "into this app.";
  } else {
    // The person is not logged into Facebook, so we're not sure if
    // they are logged into this app or not.
    document.getElementById("status").innerHTML =
      "Please log " + "into Facebook.";
  }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
  FB.getLoginStatus(function (response) {
    statusChangeCallback(response);
  });
}

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
  console.log("Welcome!  Fetching your information.... ");
  FB.api("/me", function (response) {
    console.log(response); //使用者id、姓名
    console.log("Successful login for: " + response.name);



  });
}

facebook_login.addEventListener('click', () => {

  FB.login()

})
// 2023/05/06 facebook登入------------------

function show() {
  var p = document.getElementById('log_in_pwd');
  p.setAttribute('type', 'text');
  document.getElementById("eye").className = "bi bi-eye";
}

function hide() {
  var p = document.getElementById('log_in_pwd');
  p.setAttribute('type', 'password');
  document.getElementById("eye").className = "bi bi-eye-slash";

}

var pwShown = 0;

document.getElementById("eye").addEventListener("click", function () {
  if (pwShown == 0) {
    pwShown = 1;
    show();
  } else {
    pwShown = 0;
    hide();
  }
}, false);

// 登入
var btn_login = document.querySelector('.btn_login');
btn_login.onclick = function () {
  var acc = $('#log_in_accoount').val(); // 使用者輸入的帳號
  var password = $('#log_in_pwd').val(); // 使用者輸入的密碼
  var data = {
    email: acc,
    password: password
  };
  axios.post('/login', data)
    .then(response => {
      // console.log(response.data);
      Swal.fire(
        '登入成功',
        'Welcome to DailyBuy~',
        'success'
      )
      setTimeout(() => {
        window.location.href = response.data.redirectUrl;
      }, 3000)

    })
    .catch(error => {
      console.log(error);
      Swal.fire(
        '登入失敗',
        '帳號或密碼錯誤',
        'warning'
      )
    });
}


