window.onload = () => {
  var product_name = sessionStorage.getItem("product_name");
  var product_price = sessionStorage.getItem("product_price");
  let uid = sessionStorage.getItem("user_id");
  let pid = sessionStorage.getItem("product_id");
  console.log(product_name);
  console.log(product_price);
  console.log(uid);
  console.log(pid);
  axios
    .get("/creat_new_form", {
      params: {
        product_name,
        product_price,
        uid,
        pid,
      },
    })
    .then(function (response) {
      const results2 = Object.keys(response).map((key) => response[key]);
      // document.querySelector(".form_outside").innerHTML="";

      let newElement = `<form method="post" action="/upload" enctype="multipart/form-data" class="">
      <div class="row ">
          <div class="col-4 "></div>
          <div class="col-4 text-center">
              <h1>商品資訊</h1>
          </div>
          <div class="col-4 "></div>
      </div>

      <div class="d-flex flex-column align-items-center ">
          <div class="">
              <label for="">
                  <h3>*店家名稱:</h3>
              </label>
              <input type="text" name="shop_name" value=${results2[0].shop_name}>
          </div>
          <div class="">
              <label for="">
                  <h3>*商品名稱:</h3>
              </label>
              <input type="text" name="product" value="${results2[0].product}" >
          </div>
          <div class="">
              <label for="">
                  <h3>*店家地址:</h3>
              </label>

              <h5 style="display: inline;">縣市:</h5>
              <select name="country" id="">
                  <option value="臺北市">臺北市</option>
                  <option value="新北市">新北市</option>
                  <option value="桃園市">桃園市</option>
                  <option value="臺中市">臺中市</option>
                  <option value="臺南市">臺南市</option>
                  <option value="高雄市">高雄市</option>
                  <option value="新竹縣">新竹縣</option>
                  <option value="苗栗縣">苗栗縣</option>
                  <option value="彰化縣">彰化縣</option>
                  <option value="南投縣">南投縣</option>
                  <option value="雲林縣">雲林縣</option>
                  <option value="嘉義縣">嘉義縣</option>
                  <option value="屏東縣">屏東縣</option>
                  <option value="宜蘭縣">宜蘭縣</option>
                  <option value="花蓮縣">花蓮縣</option>
                  <option value="臺東縣">臺東縣</option>
                  <option value="基隆市">基隆市</option>
                  <option value="新竹市">新竹市</option>
                  <option value="嘉義市">嘉義市</option>
              </select>
              <h5 style="display: inline;">地址:</h5>
              <input type="text" name="shop_state" value="${results2[0].shop_state}">
          </div>
          <div class="good_pic d-flex flex-column">
              <div>
                  <h3>*上傳商品照片:</h3>
              </div>
              <div class="pic_box d-flex justify-content-evenly align-items-end">
                  <div>
                      <label class="main_pic1" for="main_pic1">*主圖片:</label>
                      <input onchange="change('main_pic1')" type="file" class="" id="main_pic1" name="pic_url">
                  </div>
                  <div>
                      <label class="side_pic side_pic2" for="side_pic2">細節圖1:</label>
                      <input onchange="change('side_pic2')" type="file" id="side_pic2" name="pic_url">

                  </div>
                  <div>
                      <label class="side_pic side_pic3" for="side_pic3">細節圖2:</label>
                      <input onchange="change('side_pic3')" type="file" id="side_pic3" name="pic_url">
                  </div>
                  <div>
                      <label class="side_pic side_pic4" for="side_pic4">細節圖3:</label>
                      <input onchange="change('side_pic4')" type="file" id="side_pic4" name="pic_url">

                  </div>
              </div>
              <!-- 是否要放假圖片 -->
          </div>
          <div class="">
              <label for="web_url">
                  <h3>*商品參考網址:</h3>
              </label>
              <input type="text" id="web_url" name="product_url">
          </div>
          <div class="">
              <label for="web_url">
                  <h3>*商品賞味期限:</h3>
              </label>
              <input type="date" id="web_url" name="exp_date" value="${results2[0].product_url}">
          </div>
          <div class="">
              <h3 style="display: inline-block;">*商品種類:</h3>
              <label for="normal">常溫食品</label>
              <input type="radio" id="normal" value="常溫" name="product_type">
              <label for="freeze">冷凍食品</label>
              <input type="radio" id="freeze" value="冷凍" name="product_type">
              <label for="others">其他</label>
              <input type="radio" id="others" value="其他" name="product_type">
          </div>
          <div class="">
              <label for="product_intro">
                  <h3>*商品簡介:</h3>
              </label>
              <input type="text" id="product_intro" name="product_intro" value="${results2[0].product_intro}">
          </div>
          <div class="">
              <div id="specbox1">
                  <label for="spec1">
                      <h3>*商品規格:</h3>
                  </label>
                  <input type="text" id="spec1" name="spec1">
                  <label for="price">
                      <h3>*價格:</h3>
                  </label>
                  <input type="text" id="price" name="spec1_price">
                  <h3 style="display: inline;">NT</h3>
              </div>


              <button type="button" onclick="enter_spec()">新增商品規格+</button>
          </div>
          <div class="discount_box">
              <div class="">
                  <h3>設定折扣碼:</h3>
              </div>
              <label for="discount">序號:</label>
              <input type="text" id="discount" name="discount">
              <label for="discount_fee">折價金額:</label>
              <input type="number" id="discount_fee" name="discount_price">
          </div>

      </div>


      <div class="row ">
          <div class="col-4 "></div>
          <div class="col-4 text-center">
              <h1>團購資訊</h1>
          </div>
          <div class="col-4 "></div>
      </div>
      <div class="d-flex flex-column align-items-start">

          <div class="">
              <h3 style="display: inline;">*可接受交易方式:</h3>
              <input type="checkbox" name="trade_way" id="face" value="face" onchange="state()">
              <label for="face" style="display: inline;">面交</label>
              <div id="trade_state" style="display: inline; width: 100px;"></div>
              <input type="checkbox" name="trade_way" id="home" value="home">
              <label for="home">宅配</label>
          </div>
          <div>
              <h3 style="display: inline;">*可接受付款方式:</h3>
              <input type="checkbox" name="pay_way" id="cash" value="cash">
              <label for="cash">貨到付款</label>
              <input type="checkbox" name="pay_way" id="bank" value="bank">
              <label for="bank">銀行匯款</label>
              <input type="checkbox" name="pay_way" id="mobile_pay" value="mobile_pay">
              <label for="mobile_pay">行動支付</label>
              <input type="checkbox" name="pay_way" id="credit" value="credit">
              <label for="credit">ATM匯款</label>
              <!-- 點選出現收款帳戶input -->
          </div>
          <div>
              <label for="">
                  <h3>*團購期限:</h3>
              </label>
              <h5 style="display: inline;">開始日期:</h3>
                  <input type="date" name="start_date">
                  <h5 style="display: inline;">結束日期:</h3>
                      <input type="date" name="end_date">

          </div>
          <div>
              <label for="">
                  <h3>*預計交貨日:</h3>
              </label>
              <input type="date" name="trade_date">

          </div>
          <div>
              <label for="notefication" name="notefication">
                  <h3>注意事項:</h3>
              </label>
              <input type="text" id="notefication" name="notefication">
          </div>

      </div>
      <div class="d-flex justify-content-end">
          <button class="new_order">確定送出</button>
      </div>
  </form>`;
      document.querySelector(".form_outside").innerHTML = newElement;
    });
  document.querySelector(".new_order").onclick = () => {
    console.log("okk");
  };
};
