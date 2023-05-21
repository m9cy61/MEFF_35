var num = 0;
var x = "";
var sp = document.getElementById("shopping1");
var spcar = document.getElementById("totalshoppingcar");
var countx = [];
sp.onclick = function () {
    if (spcar.style.display = "block" == true) {
        spcar.style.display = "none"
    } else {
        spcar.style.display = "block"
    };
}

document.getElementById("carnono").onclick = function () {
    spcar.style.display = "none";
}
document.getElementById("check").addEventListener("click", addToCart);
let shoppingCart = [];
function addToCart() {
    let itemName = document.querySelector('[data-name]').textContent;
    let itemPrice = parseInt(document.querySelector('[data-price]').dataset.price);
    let itemQty = parseInt(document.querySelector('#Acount').textContent);
    let itemImg = document.querySelector('.aphoto').getAttribute('src');
    console.log(itemImg);
    shoppingCart.push({ name: itemName, price: itemPrice, qty: itemQty, img: itemImg });
    //alert('已加入購物車！');
    console.log(itemName);
    function updateCartQty() {
        let cartQty = document.querySelector('.bi-cart4');
        let totalQty = 0;
        for (let i = 0; i < shoppingCart.length; i++) {
            totalQty += shoppingCart[i].qty;
        }
        cartQty.innerHTML = `<span class="cart-qty">${totalQty}</span>`;
    };
    updateCartQty()
    function showCart() {
        let cartItems = document.querySelector('#totalshoppingcar');
        // cartItems.innerHTML = '';
        for (let i = 0; i < shoppingCart.length; i++) {
            let item = shoppingCart[i];
            let html = `
            <div class="cart-item" style="float:right background-color:transparent">
            <img src="${item.img}" alt="${item.name}" style="width: 100px; height: 100px; float:left">
              <div class="cart-item-info" style="float:right background-color:transparent" >
                <p>${item.name}</p>
                <p>數量：${item.qty}</p>
                <p>價格：${item.price}元</p>
              </div>
            </div>
          `;
            cartItems.innerHTML += html;
        }
    };
    showCart();
}



document.getElementById("check2").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noB").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("check3").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noC").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("check4").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noD").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("check5").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noE").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("check6").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noF").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checka").onclick = function () {
    num++;
    document.getElementById("noa").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checkb").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("nob").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checka").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noa").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checkb").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("nob").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checkc").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noc").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checkd").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("nod").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checke").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("noe").style.display = "none";
    document.getElementById("allshop").innerText = num;
}
document.getElementById("checkf").onclick = function () {
    num++;
    console.log(num);
    document.getElementById("nof").style.display = "none";
    document.getElementById("allshop").innerText = num;
}

var Bmodal = document.getElementById("noB");
var Bbtn = document.getElementById("B");
var Bspan = document.getElementsByClassName("noBclose")[0];
Bbtn.onclick = function () {
    Bmodal.style.display = "block";
}
Bspan.onclick = function () {
    Bmodal.style.display = "none";
}
window.onclick = function (r) {
    if (r.target == Bmodal) {
        document.getElementById("noB") = "none";
    }
}
function Badd() {
    var conut111 = document.getElementById("Bcount").innerHTML;
    document.getElementById("Bcount").innerHTML = parseInt(conut111) + 1;
}
function Bminus() {
    var conut111 = document.getElementById("Bcount").innerHTML;
    if (parseInt(conut111) > 1) {
        document.getElementById("Bcount").innerHTML = parseInt(conut111) - 1;
    }
}
function Bcheck() {
    Bmodal.style.display = "none";
}

var bmodal = document.getElementById("nob");
var bbtn = document.getElementById("b");
var bspan = document.getElementsByClassName("bclose")[0];
bbtn.onclick = function () {
    bmodal.style.display = "block";
}
bspan.onclick = function () {
    bmodal.style.display = "none";
}
window.onclick = function (r) {
    if (r.target == bmodal) {
        document.getElementById("nob") = "none";
    }
}
function badd() {
    var conunt = document.getElementById("nobcount").innerHTML;
    document.getElementById("nobcount").innerHTML = parseInt(conunt) + 1;
}
function bbminus() {

    var c = document.getElementById("nobcount").innerHTML;
    if (parseInt(c) > 1) {
        document.getElementById("nobcount").innerHTML = parseInt(c) - 1;
    }
}
