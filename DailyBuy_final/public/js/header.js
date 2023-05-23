let seach_bar = document.querySelector(".search_modal");
let modalBackground = document.querySelector(".search_modal_background");
axios
  .get("/userlogin")
  .then((response) => {
sessionStorage.removeItem("imgsrc");
    console.log(response.data.selfie);
    if (typeof response.data.selfie === "undefined") {
      sessionStorage.setItem("imgsrc", "/media/logo/member_icon.png");
      document.querySelector("#member_icon").src = sessionStorage.getItem("imgsrc");
    } else {
      sessionStorage.setItem("imgsrc", response.data.selfie);
      document.querySelector("#member_icon").src = sessionStorage.getItem("imgsrc");
    }
  })
  .catch((error) => {
    document.querySelector("#member_icon").src = "/member_icon.png";
  });
  document.querySelector("#member_icon").src = sessionStorage.getItem("imgsrc");
document.addEventListener("click", function (r) {
  if (r.target == document.querySelector(".bi-search")) {
    seach_bar.style.display = "flex";
    seach_bar.classList.add("show");
    modalBackground.classList.add("show");
  } else if (r.target != seach_bar && !seach_bar.contains(r.target)) {
    seach_bar.style.display = "none";
    modalBackground.classList.remove("show");
    document.querySelector(".search_modal_input").value = "";
  }
});
document.querySelector(".search_icon").onclick = () => {
  let seach_content = document.querySelector(".search_modal_input");
  sessionStorage.setItem("seach_content", seach_content.value);
  window.location = "/allProducts";
};