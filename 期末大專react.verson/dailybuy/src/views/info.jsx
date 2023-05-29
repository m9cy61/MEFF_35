import React, { useState,useEffect } from "react";

function Info(props) {
  const { onChildSelect } = props;
  const [Price, setPrice] = useState(0);
  let [pdname, setpdname] = useState("");
  // let[pdprice,setpdprice]=useState();
    useEffect(() => {
    const countInput = document.querySelector(".product_count");
    if (countInput) {
      setpdname(countInput.value);
    }
  }, [pdname]);
  const selectinfo = (event) => {
    console.log(document.querySelector(".product_count").value);
    const targetOption = event.target.selectedOptions[0];
    setPrice(targetOption.dataset.price);
    setpdname(document.querySelector(".product_count").value);
    onChildSelect(targetOption.dataset.price, document.querySelector('.product_count').value);
  };

  return (
    <React.Fragment>
      <div className="product_select">
        <select className="product_count" onChange={selectinfo}>
          <option id="spec1" data-price={props.Product.spec1_price}>
            {props.Product.spec1}
          </option>
          <option id="spec2" data-price={props.Product.spec2_price}>
            {props.Product.spec2}
          </option>
          <option id="spec3" data-price={props.Product.spec3_price}>
            {props.Product.spec3}
          </option>
        </select>
      </div>
      <br />
      <p className="intro_text">金額</p>
      <p className="product_sum">
        {Price ? Price : props.Product.spec1_price}元
      </p>
    </React.Fragment>
  );
}

export default Info;
