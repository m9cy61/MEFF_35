import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Introinfo(props) {
  const navigate =useNavigate();
  const [displayedDiv, setDisplayedDiv] = useState(".sells_info");
  let change_block = (event) => {
    // console.log(event.target.classList[0]);
    switch (event.target.classList[0]) {
      case "info_sells":
        setDisplayedDiv(".sells_info");
        break;
      case "info_contact":
        setDisplayedDiv(".pd_contact_info");
        break;
      default:
        setDisplayedDiv(".change_info");
        break;
    }
  };
  let mail_submit = () => {
    let message = document.querySelector("#host_contact_input").value;
    axios
      .post("http://localhost:3000/product/send-email", {
        uid:props.userId,
        pid:props.Product.product_id,
        pname:props.Product.product,
        message,
      })
      .then((response) => {
        console.log(response);
        alert("團主已經收到訊息了！請注意您的會員信箱");
      })
      .catch((err)=>{
        window.location="/Login";
      })
    
    document.querySelector("#host_contact_input").value = "";
  };
  return (
    <React.Fragment>
      <div className="product_about">
        <ul className="product_about_ul" onClick={change_block}>
          <li className="info_sells">商品介紹</li>
          <li className="info_contact">聯絡資訊</li>
          <li className="info_change">退換貨須知</li>
        </ul>

        <div
          className={`sells_info`}
          style={{ display: displayedDiv === ".sells_info" ? "flex" : "none" }}
        >
          <img src={require(`../public/media/product/${props.Propic1}.jpg`)} className="sells_info_bg" />
          {/* <img src={require(`${props.Propic1}`)} className="sells_info_bg" /> */}
         
          <div className="sells_info_content">
            {props.Product.product_intro}
          </div>
        </div>
        <div
          className={`pd_contact_info`}
          style={{
            display: displayedDiv === ".pd_contact_info" ? "flex" : "none",
          }}
        >
          有什麼問題想問團主嗎？在此留言！
          <textarea id="host_contact_input" name="message"></textarea>
          <input type="submit" value="送出" className="host_contact_submit" onClick={!props.userId ? () => navigate("/login") : mail_submit}  />
        </div>
        <div
          className={`change_info`}
          style={{ display: displayedDiv === ".change_info" ? "flex" : "none" }}
        >
          七日鑑賞期是根據消費者保護法規定，客戶（含本人、親友或管理員等），在簽收商品後隔日起算七日，在商品(非客製化商品)保持全新狀能且完整包裝的情況下，可無條件退回商品。
          <br />
          顏色的部份因電腦設定關係，實品顏色會比電腦上有較亮或較暗的情況同屬正常範圍，對顏色較敏感的買家，請確認可接受再作訂購。
          <br />
          收到商品超過7天，恕不接受退貨。
          <br />
          請於您想退貨的訂單中，留言提出您的退貨申請及退貨原因，收到您的退貨申請後，我們立即與您確認退貨相關事宜。
          <br />
          退貨商品皆不可使用過，保持商品全新，吊牌未折，並請依原包裝寄回。退回商品需包含此筆訂單的所有商品（含贈品）及發票等，如未將此筆訂單包裹中的所有內容物妥善包裝、完整寄回，需請您自費郵資補件。
          <br />
          如果訂單已享有滿額或滿件等優惠，將不接受部分退貨。
          <br />
          已使用之優惠券於完成結帳後即不再有效，退貨申請成立後也無法取回優惠券，敬請見諒。
          <br />
          當您提交退貨申請表後，即代表同意我們的退貨原則，並接受我們代為處理發票作廢及相關的後續處理事宜。
        </div>
      </div>
    </React.Fragment>
  );
}
export default Introinfo;
