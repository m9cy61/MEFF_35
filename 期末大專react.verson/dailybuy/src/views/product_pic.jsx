import React, { useState } from "react";
import "../public/css/product.css";
function ProPic(prop) {
  // const [productId,setproductId]=useState(prop.productId);
  // if(productId<0){
  //   setproductId(0+productId)
  // }else{
  // }
  const [selectedImage, setSelectedImage] = useState(
    // prop.Propic1
    require(`../public/media/product/${prop.Propic1}.jpg`)
    // require('../public/media/product/10/01.jpg')
  );

  function changePicEnter(event) {
    setSelectedImage(event.target.src);
    event.target.style.border = "3px solid rgb(240, 132, 0)";
  }

  function changePicLeave(event) {
    event.target.style.border = "";
  }
  return (
    <div className="product_pic_container">
      <div className="product_pic">
        <div className="item">
          <img
            id="item1"
            src={require(`../public/media/product/${prop.Propic2}.jpg`)}
            // src={require(prop.Propic2)}
            alt="Item 1"
            onMouseEnter={changePicEnter}
            onMouseLeave={changePicLeave}
          />
          <img
            id="item2"
            src={require(`../public/media/product/${prop.Propic3}.jpg`)}
            // src={require(`${prop.Propic3}`)}
            alt="Item 2"
            onMouseEnter={changePicEnter}
            onMouseLeave={changePicLeave}
          />
          <img
            id="item3"
            src={require(`../public/media/product/${prop.Propic4}.jpg`)}
            // src={require(`${prop.Propic4}`)}
            alt="Item 3"
            onMouseEnter={changePicEnter}
            onMouseLeave={changePicLeave}
          />
        </div>
        <div className="item_big">
          <img id="item_pic" src={selectedImage} alt="Selected Item" />
        </div>
      </div>
    </div>
  );
}
export default ProPic;
