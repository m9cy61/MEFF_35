window.onload = () => {
  var product_name = sessionStorage.getItem("product_name");
  var product_price = sessionStorage.getItem("product_price");
  let uid = sessionStorage.getItem("user_id");
  let pid = sessionStorage.getItem("product_id");
  console.log(uid);
  console.log(pid);
  console.log(product_name);
  console.log(product_price);
  document.querySelector("#agreement_btn").onclick = () => {
    // console.log(product_name);
    // console.log(product_price);

    axios
      .post("/add_order", {
        product_name: product_name,
        product_price: product_price,
        uid: uid,
        pid: pid,
      })
      .then(function (response) {
        console.log(response);
        Swal.fire({
          title: "跟團成功!",
          text: "3秒後跳轉至付款頁面",
          icon: "info",
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = "/payment";
        }, 3000);
      });
  };
};
