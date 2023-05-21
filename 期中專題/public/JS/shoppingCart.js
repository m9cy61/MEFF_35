// 建立一個空的購物車
var cart = [];

// 將商品加入購物車
function addToCart(name, price) {
	// 建立商品物件
	var item = {
		name: name,
		price: price
	};
	// 將商品加入購物車
	cart.push(item);
	// 更新購物車列表
	updateCart();
}

// 從購物車刪除商品
function removeFromCart(index) {
	// 刪除指定索引的商品
	cart.splice(index, 1);
	// 更新購物車列表
	updateCart();
}

// 更新購物車列表
function updateCart() {
	var cartList = document.getElementById("cart");
	// 清空購物車列表
	cartList.innerHTML = "";
	// 如果購物車是空的，顯示 "購物車是空的" 訊息
	if (cart.length === 0) {
		var listItem = document.createElement("li");
		listItem.textContent = "購物車是空的";
		cartList.appendChild(listItem);
	} else {
		// 顯示購物車中的商品
		for (var i = 0; i < cart.length; i++) {
			var item = cart[i];
			var listItem = document.createElement("li");
			listItem.innerHTML = item.name + " - " + item.price + "元 " + "<button onclick='removeFromCart(" + i + ")'>刪除</button>";
			cartList.appendChild(listItem);
		}
	}
}
