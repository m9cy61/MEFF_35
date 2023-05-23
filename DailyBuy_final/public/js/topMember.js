
// const { default: axios } = require("axios")

var topMember_cards = document.getElementById("topMember_cards")
function move(id){
  sessionStorage.setItem("product_id",id);
console.log(id)
 }
axios.get('/topMember/card')
.then(
  (card2data) => {
      const sortedData = card2data.data.sort((a, b) => b.order_count - a.order_count);
      let count = 0;
      sortedData.forEach((val, index) => {
        if (count < 3) {
          let nom;
          if (index === 0) {
            nom = "一";
          } else if (index === 1) {
            nom = "二";
          } else if (index === 2) {
            nom = "三";
          } else {
            nom = "其他";
          }
          console.log(`${val.order_count}:${val.user_id}`)
          // 將地址轉換成標籤
          const address = `${val.address}`;
          const city = address.substring(0, 3);
          console.log(JSON.stringify(val));
          // 預設圖片的URL
          const cardHTML = (`
            <div class="card col-12 justify-content-center" style="width: 100%; height: 300px; border-radius: 50px;">
            <div class="row g-0">
              <div class="col-md-3 mt-3 d-flex flex-column justify-content-center align-items-center">
                <p class="rank fs-1">精選團主第${nom}名</p>
                <img src="${val.selfie}" class="pol_img" alt="頭像">
                <p class="mt-1 fs-2">${val.nick_name}</p>
              </div>
              <div class="col-md-8 mt-4">
                <div class="card-body">
                  <h5 class="card-title">主要所在地:${city}</h5>
                  <a href="/product" onclick="move(${val.product_id})" ><img src="${val.pic_url1}" class="pd_img" alt="商品圖" title="${val.shop_name} - ${val.product}" onerror="this.src='/media/logo/logo.png'"></a>
                  <a href="/product" onclick="move(${val.product_id})" ><img src="${val.pic_url2}" class="pd_img" alt="商品圖" onerror="this.src='/media/logo/logo.png'"></a>
                  <a href="/product" onclick="move(${val.product_id})" ><img src="${val.pic_url3}" class="pd_img" alt="商品圖" onerror="this.src='/media/logo/logo.png'"></a>
                  <a href="/product" onclick="move(${val.product_id})" ><img src="${val.pic_url4}" class="pd_img" alt="商品圖" onerror="this.src='/media/logo/logo.png'"></a>
                  <p class="card-text align-items-center"><small class="text-muted ">團購履歷</small></p>
                </div>
              </div>
              <div class="col-md-1">
                <button type="button" class="card_btn btn-primary" data-bs-toggle="modal"
                  data-bs-target="#cardModal${val.user_id}">連<br>絡<br>團<br>主</button>
              </div>
            </div>
          </div>
  
          <div class="modal fade" id="cardModal${val.user_id}" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
            aria-labelledby="cardModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <div class="container-fluid">
                    <div class="row">
                      <div class="box_Img col-md-4"><img src="${val.selfie}" class="pol_modal_img" alt="頭像" onerror="this.src='/media/member/img_avatar.png'"></div>
                      <div class="box_text col-md-8">
                        <h5>姓名 : ${val.nick_name}</h5>
                        <h5>信箱 : ${val.email}</h5>
                        <h5>生日 : ${val.birthday}</h5>
                      </div>
                    </div>
                    <div class="row">
                      <ul class="nav nav-tabs">
                        <li class="nav-item">
                          <button class="nav-link active" id="nav-message-tab${val.user_id}" data-bs-toggle="tab"
                            data-bs-target="#nav-message${val.user_id}" type="button" role="tab" aria-controls="nav-message"
                            aria-selected="false">站內私訊</button>
                        </li>
                      </ul>
                      </nav>
                      <div class="tab-content" id="nav-tabContent">
                        <div class="tab-pane fade show active" id="nav-message${val.user_id}" role="tabpanel"
                          aria-labelledby="nav-message-tab${val.user_id}">
                          <form>
                            <div class="mb-3 mt-3">
                              <p>在此輸入要詢問的內容，系統將為你送出信件</p>
                            </div>
                            <div class="mb-3">
                              <textarea class="form-control" id="message-text" rows="3"></textarea>
                            </div>
                            <div class="modal-footer">
                              <button type="button" class="btn btn-primary" id="send_mail">送出</button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            </div> 
            `)
             topMember_cards.classList.add('container');
             topMember_cards.innerHTML += cardHTML;
             count++;
           }
         })
         
    document.querySelector("#send_mail").onclick = () => {
      let message = document.querySelector("#send_mail").value;
      axios
        .post("/product/send-email", {
          uid,
          pid,
          message,
        })
        .then(function (response) {
          console.log(response);
          console.log("ok");
        });
      alert("團主已經收到訊息了！請注意您自己的信箱是否有收到回信！");
      document.querySelector("#host_contact_input").value = "";
    };
  }
)