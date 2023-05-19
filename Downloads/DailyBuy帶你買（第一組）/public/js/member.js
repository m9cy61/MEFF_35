// Get the element with id="defaultOpen" and click on it
// document.getElementById("defaultOpen").click();
// 主要三分頁
const store_product_id = id => {                      //用sessionStorage儲存商品id的function
    sessionStorage.setItem('product_id', id);
    window.location = '/product';
};

async function openMember() {

    var login_or_not = await axios.get('/userlogin');
    // console.log('///////////////////////')
    // console.log(typeof login_or_not.data)
    // console.log('///////////////////////')
    if (login_or_not.data === 'undefined') {
        window.location = '/login';
        // alert('沒登入')
    } else {

        var my_info_table = document.querySelector(".my_info_table");
        document.getElementById("member_section").style.display = "block";
        document.getElementById("follower_section").style.display = "none";
        document.getElementById("leader_section").style.display = "none";
        $(".openMember").addClass("active");
        $(".openFollower").removeClass("active");
        $(".openLeader").removeClass("active");
        axios.post("/member/info")
            .then(response => {
                // alert('連線資料庫完成')
                // console.log(response.data[1].session);
                // 更換大頭貼--------------------------------------------
                var selfieSrc = '/';
               
                console.log(response.data[1].session);
                if (response.data[1].session.pic) {
                    selfieSrc = response.data[1].session.pic;
                } else if (response.data[1].session.google_pic) {
                    selfieSrc = response.data[1].session.google_pic;
                } else {
                    selfieSrc = 'media/member/img_avatar.png';
                }
                sessionStorage.setItem('user_id', response.data[1].session.id)

                // 更換大頭貼--------------------------------------------


                $(".selfie").attr("src", selfieSrc);
                // 更新名字
                var head_nick_name = response.data[0][0].nick_name ? response.data[0][0].nick_name : ""
                $(".head_nick_name").text(head_nick_name);
                // 更新表格

                my_info_table.remove();
                $("#my_info").append(`
            <table class="my_info_table">
            <tr>
                <td><strong>帳號：</strong></td>
                <td>${response.data[0][0].email}</td>
            </tr>
            <tr>
                <td><strong>本名：</strong></td>
                <td>${response.data[0][0].user_name ? response.data[0][0].user_name : ''}</td>
            </tr>
            <tr>
                <td><strong>暱稱：</strong></td>
                <td>${response.data[0][0].nick_name ? response.data[0][0].nick_name : ''}</td>
            </tr>
            <tr>
                <td><strong>生日：</strong></td>
                <td>${response.data[0][0].birthday ? response.data[0][0].birthday : ''}</td>
            </tr>
            <tr>
                <td><strong>手機：</strong></td>
                <td>${response.data[0][0].phone ? response.data[0][0].phone : ''}</td>
            </tr>
            <tr>
                <td><strong>地址：</strong></td>
                <td>${response.data[0][0].address ? response.data[0][0].address : ''}</td>
            </tr>
            <tr>
                <td><strong>自介:</strong></td>
                <td style="font-size: 22px;">
                ${response.data[0][0].user_intro ? response.data[0][0].user_intro : ''}</td>
            </tr>
        </table>
            
            `)
            })
            .catch(error => {
                console.error(error);
            });
    };
};

window.onload = openMember();

function openFollower() {
    document.getElementById("follower_section").style.display = "block";
    $(".openFollower").addClass("active");
    document.getElementById("member_section").style.display = "none";
    document.getElementById("leader_section").style.display = "none";
    $(".openMember").removeClass("active");
    $(".openLeader").removeClass("active");
    axios.post("/member/follower")
        .then(response => {
            // console.log("送回來的" + response.data[0]);
            // 更新表格
            // console.log(response.data[0]);
            if (!response.data[0]) {
                Swal.fire({
                    title: '<strong>還沒有跟團商品喔~</strong>',
                    icon: 'info',
                    html:
                        '<a href="/allProducts">現正熱賣中</a></br>',
                    showCloseButton: true,
                })
            } else {
                var follower_group = document.querySelector(".follower_group");
                follower_group.innerHTML = "";
                for (let i = 0; i < response.data.length; i++) {
                    console.log(response.data[i]);
                    $(".follower_group").append(`
                        <div class="card container row mb-3">
                            <div class="card-body row align-items-center justify-content-center">
                                <div class="col-8 text_container">
                                    <h5 class="text-center card-title">${response.data[i].shop_name + "-" + response.data[i].product}</h5>
                                    <p class="text-center card-text">團購時間:~${response.data[i].end_date}</p>
                                    <div class="state_div text-center">
                                        <span class="state">${response.data[i].shipping_status == 1 ? "已出貨" : "未出貨"}</span>
                                        <button class="btn btn_state" onclick="follower_order(${response.data[i].product_id})">詳細訂單</button>
                                </div>
                            </div>
                            <div class="col-4 justify-content-center img_container" >
                                <img onclick="store_product_id(${response.data[i].product_id})" src="${response.data[i].pic_url1}" style="max-width: 100%; cursor: pointer;" alt="${response.data[i].shop_name + response.data[i].product}">
                            </div>

                        </div>
                        </div>
                    `)
                }
            }

        })
        .catch(error => {
            console.error(error);
        });
}
function openLeader() {
    document.getElementById("leader_section").style.display = "block";
    $(".openLeader").addClass("active");
    document.getElementById("member_section").style.display = "none";
    document.getElementById("follower_section").style.display = "none";
    $(".openMember").removeClass("active");
    $(".openFollower").removeClass("active");
    axios.post("/member/leader")
        .then(response => {
            // console.log("送回來的" + response.data[0]);
            // 更新表格
            if (!response.data[0]) {
                Swal.fire({
                    title: '<strong>你還沒有開團喔~</strong>',
                    icon: 'info',
                    html:
                        '<a href="/sellerform">我要開團</a></br>',
                    showCloseButton: true,
                })
            } else {
                var leader_group = document.querySelector(".leader_group");
                leader_group.innerHTML = "";
                for (let i = 0; i < response.data.length; i++) {

                    // console.log(response.data[0])
                    $(".leader_group").append(`
                <div class="card container row mb-3">
                    <div class="card-body row align-items-center justify-content-center">
                        <div class="col-8 text_container">
                            <h5 class="text-center card-title">${response.data[i].shop_name + "-" + response.data[i].product}</h5>
                            <p class="text-center card-text">團購時間:~${response.data[i].end_date}</p>
                            <div class="text-center state_div">
                                <button class="btn btn_state" onclick="leader_order(${response.data[i].product_id})">詳細訂單</button>
                            </div>
                        </div>
                        <div class="col-4 justify-content-center img_container" >
                            <img  onclick="store_product_id(${response.data[i].product_id})" src="${response.data[i].pic_url1}" style="max-width: 100%;max-height:100%;cursor: pointer; " alt="${response.data[i].shop_name + response.data[i].product}">
                        </div>

                    </div>
                </div>
            `)
                }
            }
        })
        .catch(error => {
            console.error(error);
        });
}

const pic_text = document.querySelector('.update_selfie p');
const pic_preview = document.querySelector('.update_selfie img');


// 修改資料對話框
function update_info() {
    document.querySelector('#update_info').showModal();
    pic_text.style.display = 'block';
    pic_preview.style.display = 'none';


}

function close_update_info() {
    document.querySelector("#update_info").close();
}

//圖片上傳之後提示

selfie.addEventListener('change', function () {

    pic_text.style.display = 'none';
    pic_preview.style.display = 'block';

    const file = this.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', function () {
        pic_preview.src = reader.result;
    });

    reader.readAsDataURL(file);
})


// 送出修改資料
async function submit__update_info() {

    if (user_intro.value.trim() === '') user_intro.value = null;

    let data_to_server = new FormData(document.getElementById('info_form'))

    await axios.post('/upload/update_info', data_to_server, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    document.querySelector("#update_info").close();

    openMember();

}

// 定義一個全域變數用於存放被選中的訂單ID
var selectedOrders = [];

// 開團訂單對話框
function leader_order(product_id) {
    document.getElementById('leader_order').style.display = "block";
    var data = {
        product_id: product_id
    }
    axios.post('/member/leader/modal', data)
        .then(response => {
            // console.log("開團訂單送回來的" + response.data[0]);
            $(".leader_order_tbody").html("");
            for (let i = 0; i < response.data.length; i++) {
                var order = response.data[i];


                $(".leader_order_tbody").append(`
                                        
                                        <tr class="border-black font_size">
                                            <td scope="col" class="text-center align-middle p-1">${response.data[i].user_name}</td>
                                            <td scope="col" class="text-center align-middle p-1">${response.data[i].product_spec}</td>
                                            <td scope="col" class="text-center align-middle p-1">${response.data[i].address}</td>
                                            <td scope="col" class="text-center align-middle p-1">${response.data[i].quantity}</td>
                                            <td scope="col" class="text-center align-middle p-1">NT.${response.data[i].price * response.data[i].quantity + (response.data[i].shipping == "面交" ? 0 : 80)}</td>
                                            <td scope="col" class="text-center align-middle p-1">${response.data[i].pay_way}</td>
                                            <td scope="col" class="text-center align-middle p-1">${response.data[i].shipping}</td>
                                            <td scope="col" class="text-center align-middle p-1" checkbox-container data-user-id="${response.data[i].user_id}">
                                                <input scope="col" class="text-center align-middle p-1" type="checkbox" ${(response.data[i].shipping_status == 1) ? "checked" : ""}>
                                            </td>
                                        </tr>
                `);
            }
            // 詳細資訊
            $(".order-info").html("");
            $(".order-info").append(`
            <div class="card col-12   mx-auto d-flex flex-row  align-items-center mb-3"
            style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
            <p class="ms-4 mt-4 font_size_title">預計面交日/出貨日:</p>
            <span class="ms-4 mt-1" style="color: red; border-bottom: 1px solid black;">${response.data[0].trade_date}</span>
            </div>
            <button id="update_state_btn" onclick="update_state(${response.data[0].product_id})" class="btn btn-warning" style="width: 100%">已出貨</button>
            
            `);

            // 監聽checkbox狀態改變事件
            $('.leader_order_tbody').on('change', 'input[type="checkbox"]', function () {
                var isChecked = $(this).is(':checked');
                var orderId = $(this).closest('tr').data('order-id');

                // 根據checkbox狀態添加或移除訂單ID到selectedOrders數組中
                if (isChecked) {
                    selectedOrders.push(orderId);
                } else {
                    var index = selectedOrders.indexOf(orderId);
                    if (index !== -1) {
                        selectedOrders.splice(index, 1);
                    }
                }
            });

        })

}

// 監聽更新出貨狀態按鈕
function update_state(product_id) {
    // 儲存已勾選的訂單 ID
    var orderIds = [];
    $(".leader_order_tbody input[type='checkbox']:checked").each(function () {
        orderIds.push($(this).closest('td').data('user-id'));
    });
    // console.log(orderIds);
    var data = {
        product_id: product_id,
        orderIds: orderIds
    }
    // 傳回後端進行更新
    axios.post('/member/leader/update', data)
        .then(response => {
            console.log(response);
            // 更新成功後，隱藏 modal
            document.getElementById("leader_order").style.display = "none";
            Swal.fire(
                '出貨狀態更新成功',
                '',
                'success'
            )
        })
        .catch(error => {
            console.log(error);
        });
};

function close_leader_order() {
    document.getElementById("leader_order").style.display = "none";
}

// 跟團訂單對話框
function follower_order(product_id) {
    document.getElementById('follower_order').style.display = "block";
    var data = {
        product_id: product_id
    }
    axios.post('/member/follower/modal', data)
        .then(response => {
            console.log("跟團訂單送回來的" + response.data[0]);
            var follower_order = document.querySelector("#follower_order");
            follower_order.innerHTML = "";
            $("#follower_order").append(`

            <button class="btn-close" style="font-size: 20px; margin-left: 1120px;"
                onclick="close_follower_order()"></button>
            <div class="container align-items-center">
                <div class="container row d-flex"
                    style="margin-left: 5px; background-color: #D9D9D9; border-radius: 34px;">
                    <!-- 商品圖 -->
                    <div class="order_img_div d-flex flex-column col-4 align-items-center justify-content-center">
                        <img class="mt-5" src="${response.data[0].pic_url1}" style="width: 200px;" alt="${response.data[0].shop_name + response.data[0].product}">
                        <div class=" mb-5 d-flex flex-column justify-content-center">
                            <p class="mt-3 fs-5">${response.data[0].country}</p>
                            <p class="mt-auto fs-5">${response.data[0].shop_name + response.data[0].product}</p>
                        </div>
                    </div>

                    <!-- 表格 -->
                    <div class="d-flex flex-column col-8 justify-content-center">
                        <table class="table order_table">
                            <thead>
                                <tr class="border-black font_size_title">
                                    <th scope="col" class="text-center">開團者</th>
                                    <th scope="col" class="text-center">規格</th>
                                    <th scope="col" class="text-center">單價</th>
                                    <th scope="col" class="text-center">件數</th>
                                    <th scope="col" class="text-center">運費</th>
                                    <th scope="col" class="text-center">共計</th>
                                </tr>
                            </thead>
                            <tbody>

                                <tr class=" border-black font_size">
                                    <td scope="col" class="text-center justify-content-center p-1">
                                        <img class="mt-4" src="${response.data[0].selfie}" width="150px" alt="大頭貼">
                                        <p class="mt-5">${response.data[0].nick_name}</p>
                                    </td>
                                    <td scope="col" class="text-center align-middle p-1">${response.data[0].product_spec}</td>
                                    <td scope="col" class="text-center align-middle p-1">NT.${response.data[0].price}</td>
                                    <td scope="col" class="text-center align-middle p-1">${response.data[0].quantity}件</td>
                                    <td scope="col" class="text-center align-middle p-1">NT.${response.data[0].shipping == "面交" ? 0 : 80}</td>
                                    <td scope="col" class="text-center align-middle p-1">NT.${response.data[0].price * response.data[0].quantity + (response.data[0].shipping == "面交" ? 0 : 80)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- 詳細資訊 -->
                <div class="container mt-3 align-items-center order-info">
                    <div class="card col-12   mx-auto d-flex flex-row  align-items-center mb-3"
                        style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
                        <div class="col-6 d-flex flex-row">
                            <p class="ms-4 mt-4 font_size_title">預計面交日/出貨日:</p>
                            <p class="ms-4 mt-4 font_size_title" style="color: red;border-bottom: 1px solid black;">
                            ${response.data[0].trade_date}</p>
                        </div>
                        <div class="col-6 d-flex flex-row">
                            <p class="ms-4 mt-4 font_size_title">商品賞味期限:</p>
                            <p class="ms-4 mt-4 font_size_title" style="color: red;border-bottom: 1px solid black;">
                            ${response.data[0].exp_date}</p>
                        </div>
                    </div>
                    <div class="card col-12   mx-auto d-flex flex-row  align-items-center mb-3"
                        style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
                        <p class="ms-4 mt-4 font_size_title">團購截止時間:</p>
                        <span class="ms-4 mt-1" style="color: red; border-bottom: 1px solid black;">${response.data[0].end_date}</span>
                    </div>
                    <div class="card col-12   mx-auto d-flex flex-row  align-items-center mb-3"
                        style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
                        <p class="ms-4 mt-4 font_size_title">取貨者:</p>
                        <span class="ms-4 mt-1" style="border-bottom: 1px solid black;">${response.data[0].order_user}</span>
                    </div>
                    <div class="card col-12   mx-auto d-flex flex-row  align-items-center mb-3"
                        style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
                        <div class="col-6 d-flex flex-row align-items-center">
                            <p class="ms-4 mt-4 font_size_title">寄送方式:</p>
                            <label class="ms-4 d-flex align-items-center">
                                <input type="checkbox" disabled ${response.data[0].shipping == "面交" ? "checked" : ''}>
                                <span class="ms-2">面交</span>
                            </label>
                            <label class="ms-4 d-flex align-items-center">
                                <input type="checkbox" disabled ${response.data[0].shipping == "宅配" ? "checked" : ''}>
                                <span class="ms-2">宅配</span>
                            </label>
                        </div>
                        <div class="col-6 d-flex flex-row">
                            <p class="ms-4 mt-4 font_size_title">付款方式:</p>
                            <p class="ms-4 mt-4 font_size_title" style="color: red;border-bottom: 1px solid black;">
                            ${response.data[0].pay_way}</p>
                        </div>
                    </div>
                </div>
            </div>

        `)

        })
        .catch(error => {
            console.error(error);
        });

}

function close_follower_order() {
    document.getElementById("follower_order").style.display = "none";
}



