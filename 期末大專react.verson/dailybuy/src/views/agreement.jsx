import axios from "axios";
// import React from "react";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../public/css/product.css";
function Agreement() {
  const location = useLocation();
  const navigate = useNavigate();
  let { productId, userId, Price, Pdname } = location.state || {};

  useEffect(() => {
    if (location.state) {
      console.log(location.state);
    } else {
      console.log("location.state is null or undefined");
    }
  }, [location.state]);
  let join_buy = () => {
    axios
      .post("http://localhost:3000/add_order", {
        pid: productId,
        product_name: Pdname,
        product_price: Price,
        uid: userId,
      })
      .then(function (response) {
        console.log(response);
      });
    console.log(location.state);
  };
  return (
    <React.Fragment>
      <div className="state_content">
        <div className="statement">
          <h3>1. 免責聲明</h3>
          本網頁所載的所有資料、商標、標誌、圖像、短片、聲音檔案、連結及其他資料等（以下簡稱「資料」），只供參考之用，賣家聯合有限公司（以下簡稱「本公司」）將會隨時更改資料，並由本公司決定而不作另行通知。雖然本公司已盡力確保本網頁的資料準確性，但本公司不會明示或隱含保證該等資料均為準確無誤。本公司不會對任何錯誤或遺漏承擔責任。
          本公司不會對使用或任何人士使用本網頁而引致任何損害（包括但不限於電腦病毒、系統固障、資料損失）承擔任何賠償。本網頁可能會連結至其他機構所提供的網頁，但這些網頁並不是由本公司所控制。本公司不會對這些網頁所顯示的內容作出任何保證或承擔任何責任。閣下如瀏覽這些網頁，將要自己承擔後果。
          此網站及其內容是在現有資料的基礎上提供，本公司只提供網上購物之場所，因此我們並不會因網站內容或因使用網上所購之產品所引起的任何損失而作直接、間接、意外、衍生性的及懲罰性的損害賠償
          （包括金錢利益及無形的損失）及負上法律責任（除了法律上已隱含的的條例）。使用在本公司購買的產品之前，請小心閱讀產品上或包裝內的產品資料、用法及注意事項，本公司並不會對製造商提供資料的準確性，、對某特定用途之適用性，、品質及或可靠性負上任何責任，故在使用之前最好仔細分析這些資料。雖然本公司已盡最大的努力顯示產品的真實面貌及顏色，但我們不能擔保閣下的電腦能準確顯示出來，圖文與實物相符之有關事項，本公司保留最終決定權。
          <h3>2. 版權</h3>
          本網站内知識產權所附有的所有權利、擁有權和權益，在任何時間均屬本公司或本公司的特許人所擁有的財產。在未經本公司或本公司的特許人書面許可前，本網站資料之全部或部份均不可被使用、複印、銷售、傳送、修改、發表、儲存或以其他方式利用作任何用途
          <h3>3. 賠償及責任限制</h3>
          若你在使用本公司網上服務時，因閣下違反訂購條款或任何行動而令本公司招致損失，你同意賠償及彌償本公司的損失、支出、毀壞及費用（包括合理的法律費用）。你同意本公司不會為你因使用本網站而招致的損失，負上任何法律責任，也同意放棄追究本公司任何賠償。如果此項聲明不適用於個別的例子，
          本公司的責任不會超過你在本網站購買產品或服務所付出的金額。
          <h4>
            本網站尊重他人的任何權利(包括知識產權)，同時也要求我們的使用者也尊重他人之權利。本網站在適當情況下，得自行決定終止侵害或違反他人權利之使用者的帳號。
            閣下如對本網站所提供的內容有疑問、對所載的某些資料有問題需要提出、發現有遺漏之處，或認為有關資料可以更為清楚的方式表達，請以電子郵件方式將您的意見及建議電郵到info@dailybuy.tw。
          </h4>
        </div>
        <input type="checkbox" name="info" id="info_check" />
        <label id="Agree" htmlFor="info_check">
          我同意以上聲明之所有內容
        </label>
        <div id="agreement">
          <button id="agreement_btn" onClick={join_buy}>
            我同意上述之聲明
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
export default Agreement;
