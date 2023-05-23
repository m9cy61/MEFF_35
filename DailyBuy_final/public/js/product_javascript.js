const not_login = () => {
  Swal.fire({
    title: "請先登入",
    text: "即將跳轉到登入頁面",
    icon: "info",
    showConfirmButton: false,
  });
  setTimeout(() => {
    window.location = "/login";
  }, 2000);
};

function toggleHeart(icon, uid, pid) {
  console.log(icon.classList.contains("bi-heart-fill"));
  console.log(icon.classList.contains("bi-heart"));
  if (icon.classList.contains("bi-heart")) {
    axios
      .post("http://localhost:3000/add-to-favorites", {
        pid: pid,
        uid: uid,
      })
      .then(() => {
        console.log("更新成功");
      })
      .catch((error) => {
        console.log(error);
      });
    icon.classList.remove("bi-heart");
    icon.classList.add("bi-heart-fill");
  } else if (!icon.classList.contains("bi-heart")) {
    axios
      .delete("http://localhost:3000/remove-to-favorites", {
        data: {
          pid: pid,
          uid: uid,
        },
      })
      .then(() => {
        console.log("刪除成功");
      })
      .catch((error) => {
        console.log(error);
      });
    icon.classList.remove("bi-heart-fill");
    icon.classList.add("bi-heart");
  }
}
window.onload = () => {
  // sessionStorage.removeItem("user_id");
  // sessionStorage.setItem("product_id", 1);
  let pid = sessionStorage.getItem("product_id");
  // sessionStorage.setItem("user_id", 1);

  axios.get("/userlogin").then(function (response) {
    if (response.data == "undefined") {
      sessionStorage.setItem("user_id", null);
      var uid = sessionStorage.getItem("user_id");
      // 從資料庫撈資料呈現到頁面上
      axios
        .get(`/product/${pid}`, {
          params: {
            uid: uid,
            pid: pid,
          },
        })
        .then(function (response) {
          // console.log(response);
          // const results = Object.keys(response.data.productData).map((key) => response.data.productData[key]);
          const results2 = Object.keys(response).map((key) => response[key]);
          // console.log(results2);
          // console.log(Array.isArray(results));
          // console.log(Array.isArray(results2));
          // console.log(results2[0].productData);
          results2[0].forEach((ele) => {
            var spec_list = [
              { spec: ele.spec1, peice: ele.spec1_price },
              { spec: ele.spec2, peice: ele.spec2_price },
              { spec: ele.spec3, peice: ele.spec3_price },
            ];

            if (!ele.spec2) {
              spec_list.pop();
              spec_list.pop();
            } else if (!ele.spec3) {
              spec_list.pop();
              // spec_list.pop();
            }

            // console.log(spec_list)
            let newElement = `<div class="product_pic_container">
          <div class="product_pic">
              <div class="item">
                  <img id="item1" src="${
                    ele.pic_url2
                  }"  onerror="this.src='/media/logo/logo.png'">
                  <img id="item2" src="${
                    ele.pic_url3
                  }"  onerror="this.src='/media/logo/logo.png'">
                  <img id="item3" src="${
                    ele.pic_url4
                  }"  onerror="this.src='/media/logo/logo.png'">
              </div>
              <div class="item_big">
                  <img id="item_pic" src="${
                    ele.pic_url1
                  }" onerror="this.src='/media/logo/logo.png'">
              </div>
          </div>
      </div>

      <div class="product_introduce_container">
          <form class="product_intro_box">
              <p class="intro_text_title">${ele.shop_name + ele.product}</p>
              <p class="intro_text">限時特價活動至${ele.end_date}</p>
              <p class="intro_text">付款方式:
                  <br>信用卡/金融卡、ATM繳款、貨到付款
              </p>
              <p class="intro_text">配送方式:
                  <br>宅配、面交
              </p>
              <br>
              <div class="product_select">
                  <select class="product_count">
                   
                  </select>
              </div>
              <br>
              <p class="intro_text">金額</p>
              <p class="product_sum">NT.${ele.spec1_price}</p>

              <div class="pd_btn" action="./statement.html">
                  <button class="btn_join" type="button" onclick="location.href='/login'">我要跟團</button>
                  <div class="pd_btn_collect">
                      <button class="btn_create " type="button" onclick="location.href='/login'">我要新開團</button>
                      <i class="bi bi-heart collect_list" onclick="location.href='/login'"></i>
                  </div>
              </div>
              </form>
              </div>`;

            document.querySelector(".pd_container").innerHTML = newElement;
            // 我要加團與我要跟團按鈕變化
            var btn_join = document.querySelector(".btn_join");
            var btn_create = document.querySelector(".btn_create");
            btn_join.addEventListener("mouseenter", () => {
              document.querySelector(".btn_join").style.backgroundColor =
                "rgb(59, 166, 1)";
              document.querySelector(".btn_join").style.color =
                "rgb(245, 245, 245)";
            });
            btn_join.addEventListener("mouseleave", () => {
              document.querySelector(".btn_join").style.border =
                "2px solid rgb(59, 166, 1)";
              document.querySelector(".btn_join").style.backgroundColor =
                "rgb(245, 245, 245)";
              document.querySelector(".btn_join").style.color =
                "rgb(59, 166, 1)";
            });
            btn_create.addEventListener("mouseenter", () => {
              document.querySelector(".btn_create").style.backgroundColor =
                "rgb(206, 112, 64)";
              document.querySelector(".btn_create").style.color =
                "rgb(245, 245, 245)";
            });
            btn_create.addEventListener("mouseleave", () => {
              document.querySelector(".btn_create").style.border =
                "2px solid rgb(206, 112, 64)";
              document.querySelector(".btn_create").style.backgroundColor =
                "rgb(245, 245, 245)";
              document.querySelector(".btn_create").style.color =
                "rgb(206, 112, 64)";
            });
            let spec_select = document.querySelector(".product_count");

            spec_list.forEach((val) => {
              spec_select.innerHTML += `<option id="spec1" data-price="${val.peice}">${val.spec}</option>`;
            });

            spec_select.addEventListener("change", function (event) {
              let targetOption = event.target.selectedOptions[0];
              const productSumElement = document.querySelector(".product_sum");
              productSumElement.textContent = `NT.${targetOption.dataset.price} `;
            });
            // 我要跟團按鈕導向隱私購買聲明

            document.querySelector(".product_about").innerHTML = "";
            let NewinfoElement = `<ul class="product_about_ul">
          <li class="info_sells">商品介紹</li>
          <li class="info_contact">聯絡資訊</li>
          <li class="info_change">退換貨須知</li>
      </ul>

      <div class="sells_info">
          <img src="${ele.pic_url1}" class="sells_info_bg">
          <div class="sells_info_content">
          ${ele.product_intro}
          </div>
      </div>
      <div class="pd_contact_info">
          有什麼問題想問團主嗎？在此留言！
          <textarea id="host_contact_input"></textarea>
          <input type="button" onclick='not_login()' value="送出" class="host_contact_submit" >
      </div>

      <div class="change_info">
          七日鑑賞期是根據消費者保護法規定，客戶（含本人、親友或管理員等），在簽收商品後隔日起算七日，在商品(非客製化商品)保持全新狀能且完整包裝的情況下，可無條件退回商品。<br>
          顏色的部份因電腦設定關係，實品顏色會比電腦上有較亮或較暗的情況同屬正常範圍，對顏色較敏感的買家，請確認可接受再作訂購。<br>
          收到商品超過7天，恕不接受退貨。<br>
          請於您想退貨的訂單中，留言提出您的退貨申請及退貨原因，收到您的退貨申請後，我們立即與您確認退貨相關事宜。<br>
          退貨商品皆不可使用過，保持商品全新，吊牌未折，並請依原包裝寄回。退回商品需包含此筆訂單的所有商品（含贈品）及發票等，如未將此筆訂單包裹中的所有內容物妥善包裝、完整寄回，需請您自費郵資補件。<br>
          如果訂單已享有滿額或滿件等優惠，將不接受部分退貨。<br>
          已使用之優惠券於完成結帳後即不再有效，退貨申請成立後也無法取回優惠券，敬請見諒。<br>
          當您提交退貨申請表後，即代表同意我們的退貨原則，並接受我們代為處理發票作廢及相關的後續處理事宜。

      </div>`;
            document.querySelector(".product_about").innerHTML = NewinfoElement;
          });

          //商品介紹、聯絡資訊、退換貨須知區塊click後換div
          let product_about_u = document.querySelector(".product_about_ul");
          product_about_u.addEventListener("click", function (data) {
            // console.log(data.target.classList[0]);
            function showdiv(divid) {
              document.querySelector(".sells_info").style.display = "none";
              document.querySelector(".pd_contact_info").style.display = "none";
              document.querySelector(".change_info").style.display = "none";
              document.querySelector(divid).style.display = "flex";
            }
            switch (data.target.classList[0]) {
              case "info_sells":
                showdiv(".sells_info");
                break;
              case "info_contact":
                showdiv(".pd_contact_info");
                break;
              default:
                showdiv(".change_info");
                break;
            }
          });

          //商品圖片mouseenter後大圖換成移入的圖片
          var item = document.getElementById("item");
          var item1 = document.getElementById("item1");
          var item2 = document.getElementById("item2");
          var item3 = document.getElementById("item3");
          var itemPic = document.getElementById("item_pic");
          item1.addEventListener("mouseenter", function () {
            var temp = itemPic.src;
            itemPic.src = item1.src;
            item1.style.border = "3px solid rgb(240, 132, 0)";
            item1.src = temp;
          });
          item1.addEventListener("mouseleave", function () {
            item1.style.border = "";
          });

          item2.addEventListener("mouseenter", function () {
            var temp = itemPic.src;
            item2.style.border = "3px solid rgb(240, 132, 0)";
            itemPic.src = item2.src;
            item2.src = temp;
          });
          item2.addEventListener("mouseleave", function () {
            item2.style.border = "";
          });

          item3.addEventListener("mouseenter", function () {
            var temp = itemPic.src;
            itemPic.src = item3.src;
            item3.style.border = "3px solid rgb(240, 132, 0)";
            item3.src = temp;
          });
          item3.addEventListener("mouseleave", function () {
            item3.style.border = "";
          });

          //詢問團主問題按鈕後要執行的傳送信件至開團者信箱

          function submit() {
            window.location = "/login";
          }
        })
        .catch(function (error) {
          console.log("錯誤:" + error);
        });
    } else if (response.data != "undefined") {
      sessionStorage.setItem("user_id", response.data.user_id);
      var uid = sessionStorage.getItem("user_id");
      // console.log(pid);
      // console.log(uid);

      axios
        .get(`/product/${pid}`, {
          params: {
            uid: response.data.user_id,
            pid: pid,
          },
        })
        .then(function (response) {
          // console.log(response)
          // console.log(response.data.collectList);
          // const results = Object.keys(response.data.productData).map((key) => response.data.productData[key]);
          const results2 = Object.keys(response).map((key) => response[key]);
          // console.log(Array.isArray(results));
          // console.log(Array.isArray(results2));
          console.log(results2);
          results2[0].productData.forEach((ele) => {
            // console.log(ele);
            let newElement = `<div class="product_pic_container">
          <div class="product_pic">
              <div class="item">
                  <img id="item1" src="${
                    ele.pic_url2
                  }" onerror="this.src='/media/logo/logo.png'">
                  <img id="item2" src="${
                    ele.pic_url3
                  }" onerror="this.src='/media/logo/logo.png'">
                  <img id="item3" src="${
                    ele.pic_url4
                  }" onerror="this.src='/media/logo/logo.png'">
              </div>
              <div class="item_big">
                  <img id="item_pic" src="${
                    ele.pic_url1
                  }" onerror="this.src='/media/logo/logo.png'">
              </div>
          </div>
      </div>

      <div class="product_introduce_container">
          <form class="product_intro_box">
              <p class="intro_text_title">${ele.shop_name + ele.product}</p>
              <p class="intro_text">限時特價活動至${ele.end_date}</p>
              <p class="intro_text">付款方式:
                  <br>信用卡/金融卡、ATM繳款、貨到付款
              </p>
              <p class="intro_text">配送方式:
                  <br>宅配、面交
              </p>
              <br>
              <div class="product_select">
                  <select class="product_count">
                      <option id="spec1" data-price="${ele.spec1_price}">${
              ele.spec1
            }</option>
                      <option id="spec2" data-price="${ele.spec2_price}">${
              ele.spec2
            }</option>
                      <option id="spec3" data-price="${ele.spec3_price}">${
              ele.spec3
            }</option>
                  </select>
              </div>
              <br>
              <p class="intro_text">金額</p>
              <p class="product_sum">NT.${ele.spec1_price}</p>

              <div class="pd_btn" action="./statement.html">
                  <button class="btn_join"  type="button">我要跟團</button>
                  <div class="pd_btn_collect">
                      <button class="btn_create" type="button">我要新開團</button>
                      <i class="bi bi-heart collect_list" 
                      onclick="
                      toggleHeart(this,${uid},${pid})
                      "></i>
                  </div>
              </div>
              </form>
              </div>`;
            document.querySelector(".pd_container").innerHTML = newElement;

            // 我要加團與我要跟團按鈕變化
            let spec_select = document.querySelector(".product_count");
            spec_select.addEventListener("change", function (event) {
              let targetOption = event.target.selectedOptions[0];
              const productSumElement = document.querySelector(".product_sum");
              productSumElement.textContent = `NT.${targetOption.dataset.price}`;
              sessionStorage.setItem(
                "product_price",
                targetOption.dataset.price
              );
            });

            // 我要跟團按鈕導向隱私購買聲明
            document.querySelector(".btn_join").onclick = () => {
              sessionStorage.setItem(
                "product_name",
                document.querySelector(".product_count").value
              );
              window.location = "/agreement";
            };

            document.querySelector(".btn_create").onclick = () => {
              window.location = " /create_new";
            };

            document.querySelector(".product_about").innerHTML = "";
            let NewinfoElement = `<ul class="product_about_ul">
          <li class="info_sells">商品介紹</li>
          <li class="info_contact">聯絡資訊</li>
          <li class="info_change">退換貨須知</li>
      </ul>

      <div class="sells_info">
          <img src="${ele.pic_url1}" class="sells_info_bg" onerror="this.src='/media/logo/logo.png'">
          <div class="sells_info_content">
          ${ele.product_intro}
          </div>
      </div>
      <div class="pd_contact_info">
          有什麼問題想問團主嗎？在此留言！
          <textarea id="host_contact_input"></textarea>
          <input type="button" value="送出" id="host_contact_submit">
      </div>

      <div class="change_info">
          七日鑑賞期是根據消費者保護法規定，客戶（含本人、親友或管理員等），在簽收商品後隔日起算七日，在商品(非客製化商品)保持全新狀能且完整包裝的情況下，可無條件退回商品。<br>
          顏色的部份因電腦設定關係，實品顏色會比電腦上有較亮或較暗的情況同屬正常範圍，對顏色較敏感的買家，請確認可接受再作訂購。<br>
          收到商品超過7天，恕不接受退貨。<br>
          請於您想退貨的訂單中，留言提出您的退貨申請及退貨原因，收到您的退貨申請後，我們立即與您確認退貨相關事宜。<br>
          退貨商品皆不可使用過，保持商品全新，吊牌未折，並請依原包裝寄回。退回商品需包含此筆訂單的所有商品（含贈品）及發票等，如未將此筆訂單包裹中的所有內容物妥善包裝、完整寄回，需請您自費郵資補件。<br>
          如果訂單已享有滿額或滿件等優惠，將不接受部分退貨。<br>
          已使用之優惠券於完成結帳後即不再有效，退貨申請成立後也無法取回優惠券，敬請見諒。<br>
          當您提交退貨申請表後，即代表同意我們的退貨原則，並接受我們代為處理發票作廢及相關的後續處理事宜。

      </div>`;
            document.querySelector(".product_about").innerHTML = NewinfoElement;
          });
          // document.querySelector(".heart-icon").addEventListener("click", function() {
          //   toggleHeart(this, uid, pid);
          // });
          var btn_join = document.querySelector(".btn_join");
          var btn_create = document.querySelector(".btn_create");
          btn_join.addEventListener("mouseenter", () => {
            document.querySelector(".btn_join").style.backgroundColor =
              "rgb(59, 166, 1)";
            document.querySelector(".btn_join").style.color =
              "rgb(245, 245, 245)";
          });
          btn_join.addEventListener("mouseleave", () => {
            document.querySelector(".btn_join").style.border =
              "2px solid rgb(59, 166, 1)";
            document.querySelector(".btn_join").style.backgroundColor =
              "rgb(245, 245, 245)";
            document.querySelector(".btn_join").style.color = "rgb(59, 166, 1)";
          });
          btn_create.addEventListener("mouseenter", () => {
            document.querySelector(".btn_create").style.backgroundColor =
              "rgb(206, 112, 64)";
            document.querySelector(".btn_create").style.color =
              "rgb(245, 245, 245)";
          });
          btn_create.addEventListener("mouseleave", () => {
            document.querySelector(".btn_create").style.border =
              "2px solid rgb(206, 112, 64)";
            document.querySelector(".btn_create").style.backgroundColor =
              "rgb(245, 245, 245)";
            document.querySelector(".btn_create").style.color =
              "rgb(206, 112, 64)";
          });
          var result_pid = results2[0].collectList[0]
            ? (result_pid = results2[0].collectList[0].product_id)
            : "";
          if (result_pid == pid && results2[0].collectList[0].user_id == uid) {
            document
              .querySelector(".collect_list")
              .classList.remove("bi-heart");
            document
              .querySelector(".collect_list")
              .classList.add("bi-heart-fill");
            console.log("有東西");
          } else if (results2[0].collectList == undefined) {
            console.log("沒有東西");
            document.querySelector(".collect_list").classList.add("bi-heart");
            document
              .querySelector(".collect_list")
              .classList.remove("bi-heart-fill");
          }
          let product_about_u = document.querySelector(".product_about_ul");
          product_about_u.addEventListener("click", function (data) {
            // console.log(data.target.classList[0]);
            function showdiv(divid) {
              document.querySelector(".sells_info").style.display = "none";
              document.querySelector(".pd_contact_info").style.display = "none";
              document.querySelector(".change_info").style.display = "none";
              document.querySelector(divid).style.display = "flex";
            }
            switch (data.target.classList[0]) {
              case "info_sells":
                showdiv(".sells_info");
                break;
              case "info_contact":
                showdiv(".pd_contact_info");
                break;
              default:
                showdiv(".change_info");
                break;
            }
          });
          var item = document.getElementById("item");
          var item1 = document.getElementById("item1");
          var item2 = document.getElementById("item2");
          var item3 = document.getElementById("item3");
          var itemPic = document.getElementById("item_pic");
          item1.addEventListener("mouseenter", function () {
            var temp = itemPic.src;
            itemPic.src = item1.src;
            item1.style.border = "3px solid rgb(240, 132, 0)";
            item1.src = temp;
          });
          item1.addEventListener("mouseleave", function () {
            item1.style.border = "";
          });

          item2.addEventListener("mouseenter", function () {
            var temp = itemPic.src;
            item2.style.border = "3px solid rgb(240, 132, 0)";
            itemPic.src = item2.src;
            item2.src = temp;
          });
          item2.addEventListener("mouseleave", function () {
            item2.style.border = "";
          });

          item3.addEventListener("mouseenter", function () {
            var temp = itemPic.src;
            itemPic.src = item3.src;
            item3.style.border = "3px solid rgb(240, 132, 0)";
            item3.src = temp;
          });
          item3.addEventListener("mouseleave", function () {
            item3.style.border = "";
          });

          //詢問團主問題按鈕後要執行的傳送信件至開團者信箱
          document.querySelector("#host_contact_submit").onclick = () => {
            let message = document.querySelector("#host_contact_input").value;
            Swal.fire({
              title: "訊息寄送成功!",
              text: "團主已收到您的訊息了喔~",
              icon: "success",
              showConfirmButton: true,
            });
            // console.log(message);
            axios
              .post("/product/send-email", {
                uid,
                pid,
                message,
              })
              .then((response) => {
                console.log(response);
              });

            document.querySelector("#host_contact_input").value = "";
          };
        });
      // .catch(function (error) {
      //   console.log("錯誤:" + error);
      // });
    }

    //商品介紹、聯絡資訊、退換貨須知區塊click後換div

    //商品圖片mouseenter後大圖換成移入的圖片
  });
};
