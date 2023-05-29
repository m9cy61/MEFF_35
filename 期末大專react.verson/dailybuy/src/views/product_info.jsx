import React, { useEffect, useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "../public/css/product.css";
import "../public/font-style/GenSenRounded-M.ttc";
import JoinBTN from "./join_btn.jsx";
import CreateBTN from "./create_btn.jsx";
import Introinfo from "./intro_info";
import Info from "./info";
import Hearticon from "./collete.jsx";
import ProPic from "./product_pic.jsx";
function Productinfo() {
  const [Product, setProduct] = useState("");
  const [userId, setUserId] = useState("");
  const [productId, setproductId] = useState(10);
  const [isClicked, setIsClicked] = useState(false);
  const [colleteList, setColleteList] = useState("");
  const [Propic1] = useState(
    `${productId < 10 ? 0 + productId : productId}/01`
  );
  const [Propic2] = useState(
    `${productId < 10 ? 0 + productId : productId}/02`
  );
  const [Propic3] = useState(
    `${productId < 10 ? 0 + productId : productId}/03`
  );
  const [Propic4] = useState(
    `${productId < 10 ? 0 + productId : productId}/04`
  );

  const [Price, setPrice] = useState(Product.spec1_price);
  const [Pdname, setPdname] = useState(Product.spec1_price);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/product/${productId}`)
      .then((response) => {
        if (!response.data.collectList) {
          setProduct(() => {
            return response.data[0];
          });
          setColleteList("");
          console.log(Product);
          setproductId(response.data[0].product_id);
        } else {
          setProduct(() => {
            return response.data.productData[0];
          });
          setColleteList(response.data.collectList[0]);
          console.log(colleteList);
        }

        
        // response.data.collectList[0]
        //   ? setColleteList("")
        //   : setColleteList(response.data.collectList[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (Product) {
      setPrice(Product.spec1_price);
      setPdname(Product.spec1);
    }
  }, [Product]);
  useEffect(() => {
    axios.get(`http://localhost:3000/userlogin`).then((response) => {
      // console.log(response);
      if (response.data === "undefined") {
        setUserId(0);
      } else {
        return setUserId(response.data.user_id);
      }
    });
  }, []);
  const toggleHeart = () => {
    if (!isClicked) {
      axios
        .post("http://localhost:3000/add-to-favorites", {
          pid: productId,
          uid: userId,
        })
        .then(() => {
          console.log("更新成功");
        })
        .catch((error) => {
          console.log(error);
        });
      setIsClicked(true);
      console.log(isClicked);
    } else if (isClicked) {
      axios
        .delete("http://localhost:3000/remove-to-favorites", {
          data: {
            pid: productId,
            uid: userId,
          },
        })
        .then(() => {
          console.log("刪除成功");
        })
        .catch((error) => {
          console.log(error);
        });
      setIsClicked(false);
      console.log(isClicked);
    }
  };
  const handleChildSelect = (selectedPrice, selectedPdname) => {
    if (!selectedPdname || !selectedPrice) {
      setPrice(Product.spec1_price);
      setPdname(Product.spec1);
    } else {
      setPrice(selectedPrice);
      setPdname(selectedPdname);
    }
  };
  if (userId !== 0) {
    return (
      <React.Fragment>
        <div className="pd_container">
          <ProPic
            productId={productId}
            Propic1={Propic1}
            Propic2={Propic2}
            Propic3={Propic3}
            Propic4={Propic4}
          />
          <div className="product_introduce_container">
            <form className="product_intro_box">
              <p className="intro_text_title">
                {Product.shop_name}
                {Product.product}
              </p>
              <p className="intro_text">限時特價活動至{Product.end_date}</p>
              <p className="intro_text">
                付款方式:
                <br />
                信用卡/金融卡、ATM繳款、貨到付款
              </p>
              <p className="intro_text">
                配送方式:
                <br />
                宅配、面交
              </p>
              <br />
              <Info
                Product={Product}
                userId={userId}
                onChildSelect={handleChildSelect}
              />
              <div className="pd_btn">
                <JoinBTN
                  productId={productId} 
                  userId={userId}
                  Price={Price}
                  Pdname={Pdname}
                />
                <div className="pd_btn_collect">
                  <CreateBTN Product={Product} userId={userId} />
                  <Hearticon
                    toggleHeart={toggleHeart} //將toggleHeart函數作為props傳遞到子元素中
                    isClicked={isClicked}
                    colleteList={colleteList}
                    productId={productId}
                    userId={userId}
                  />
                 
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <hr />
        <div>
          <div className="product_about">
            <Introinfo Product={Product} Propic1={Propic1} userId={userId}/>
          </div>
          <br />
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <div className="pd_container">
          <ProPic
            productId={productId}
            Propic1={Propic1}
            Propic2={Propic2}
            Propic3={Propic3}
            Propic4={Propic4}
          />
          <div className="product_introduce_container">
            <form className="product_intro_box">
              <p className="intro_text_title">
                {Product.shop_name}
                {Product.product}
              </p>
              <p className="intro_text">限時特價活動至{Product.end_date}</p>
              <p className="intro_text">
                付款方式:
                <br />
                信用卡/金融卡、ATM繳款、貨到付款
              </p>
              <p className="intro_text">
                配送方式:
                <br />
                宅配、面交
              </p>
              <br />
              <Info
                Product={Product}
                userId={userId}
                onChildSelect={handleChildSelect}
              />
              <div className="pd_btn">
                <JoinBTN
                  productId={productId}
                  userId={userId}
                  Price={Price}
                  Pdname={Pdname}
                />
                <div className="pd_btn_collect">
                  <CreateBTN Product={Product} userId={userId} />
                  <Hearticon
                    toggleHeart={toggleHeart} //將toggleHeart函數作為props傳遞到子元素中
                    isClicked={isClicked}
                    colleteList={colleteList}
                    productId={productId}
                    userId={userId}
                  />
                </div>
              </div>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
        <hr />
        <div>
          <div className="product_about">
            <Introinfo Product={Product} Propic1={Propic1} />
          </div>
          <br />
          <br />
          <br />
        </div>
      </React.Fragment>
    );
  }
}

export default Productinfo;
