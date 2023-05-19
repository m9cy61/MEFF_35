var collectList = [];   //定義收藏清單

const store_product_id = id => {                      //用sessionStorage儲存商品id的function

    sessionStorage.setItem('product_id', id);

};

const render_card = (data_results, collectList) => {   //渲染出商品卡片的function
    data_results.data.forEach((val, index) => {

        search_results.classList.add('container');
        search_results.classList.add('row', 'g-0');

        const address = `${val.address}`;
        const pcity = address.substring(0, 3);
        
        const city = val.country;
        let cityAddress;
        // 使用 if else 判斷進行地址字串替換
        if (city === '臺北市' || city === '台北市' || city === '新北市' || city === '基隆市' || city === '新竹市' || city === '桃園市' || city === '新竹縣' || city === '宜蘭縣') {
            cityAddress = '北部地區';
        } else if (city === '臺中市' || city === '台中市' || city === '苗栗縣' || city === '彰化縣' || city === '南投縣' || city === '雲林縣') {
            cityAddress = '中部地區';
        } else if (city === '高雄市' || city === '臺南市' || city === '台南市' || city === '嘉義市' || city === '嘉義縣' || city === '屏東縣' || city === '澎湖縣') {
            cityAddress = '南部地區';
        } else if (city === '花蓮縣' || city === '臺東縣' || city === '台東縣') {
            cityAddress = '東部地區';
        } else {
            cityAddress = null;
        }
        // 檢查商品是否在收藏清單中

        const heartIconClass = collectList.includes(val.product_id) ? "bi-heart-fill" : "bi-heart";

        // 開團期限轉換
        const now = new Date();
        const nowTime = now.getTime();
        const endday = new Date(val.end_date);
        const enddayTime = endday.getTime();
        const Time = enddayTime - nowTime;
        let the_term;
        if (Time <= 0) {
            the_term = '已到期';
        } else if (Time <= 7 * 24 * 60 * 60 * 1000) {
            the_term = '即將到期';
        } else {
            the_term = '尚有時間';
        }

        search_results.innerHTML += `

                    <div class="card col-1 product" data-tags="${cityAddress},${val.product_type},${the_term}" style="width: 400px; border-radius: 0px 0px 30px 30px;">
                            <a href="/product" class="productlink a-link" id="pd_${val.product_id}" onclick="store_product_id(${val.product_id})"><img src="${val.pic_url1}"  loading="lazy" class="pd_img" onerror="this.src='/media/logo/logo.png'" alt="商品圖"></a>
                            <div class="card-body">
                                <a href="/product" style="width: 100%;
                                height: 100%;" class="link-dark productlink" id="pd_${val.product_id}" onclick="store_product_id(${val.product_id})" data-bs-toggle="tooltip" title="${val.shop_name} - ${val.product}">
                                    <h5 class="card-title text-truncate">${val.shop_name} - ${val.product}</h5>
                                </a>
                                <div class="card-tag">
                                    <span class="btn-sm fs-5">#開團期限: - ${endday.toLocaleDateString()}</span><br>
                                    <a class="btn-tag btn-sm" href="#" role="button" ip="type1">#${cityAddress}</a>
                                    <a class="btn-tag btn-sm" href="#" role="button" ip="type2">#${val.country}</a>
                                    <a class="btn-tag btn-sm" href="#" role="button" ip="type3">#${val.product_type}商品</a>
                                    <a class="btn-tag btn-sm" href="#" role="button" ip="type4">#${the_term}</a>
                                </div>
                                <div class="row">
                                    <div class="card-text mt-1 col-9">
                                        團主地點 : ${pcity} <br>
                                        開團者 : ${val.nick_name}
                                    </div>
                                    <div class="col-3 fs-2 mt-1 btn">
                                        <i id="heartIcon${val.product_id}" class="heart_icon bi ${heartIconClass}" onclick="Heart(this,${val.product_id})" style="color:palevioletred;"></i>
                                    </div>
                                </div>
                                <hr>
                                <div class="card_overviewtext">
                                    <P>價格：NT.${val.spec1_price} </P>
                                </div>
                                <div class="card_btn ">
                                    <button type="button" class="card_btn btn-primary" data-bs-toggle="modal"
                                        data-bs-target="#cardModal${val.product_id}">查看團主</button>
                                </div>
                            </div>

                            <div class="modal fade" id="cardModal${val.product_id}" data-bs-backdrop="static" data-bs-keyboard="false"
                                tabindex="-1" aria-labelledby="cardModalLabel" aria-hidden="true">
                                <div class="modal-dialog">
                                    <div class="modal-content">
                                        <div class="modal-header">
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                                aria-label="Close"></button>
                                        </div>
                                        <div class="modal-body">
                                            <div class="container-fluid">
                                                <div class="row">
                                                    <div class="box_Img col-md-4"><img src="${val.selfie}${val.user_id}" class="pol_img"
                                                            alt="頭像" onerror="this.src='/media/member/img_avatar.png'"></div>
                                                    <div class="box_text col-md-8">
                                                        <h5>姓名 : ${val.nick_name}</h5>
                                                        <h5>信箱 : ${val.email}</h5>
                                                        <h5>生日 : ${val.birthday}</h5>
                                                    </div>
                                                </div>
                                                <div class="row">
                                                    <ul class="nav nav-fill nav-tabs">
                                                        <li class="nav-item">
                                                            <button class="nav-link" id="nav-vitae-tab${val.product_id}" data-bs-toggle="tab"
                                                                data-bs-target="#nav-vitae${val.product_id}" type="button" role="tab"
                                                                aria-controls="nav-vitae" aria-selected="true" onclick='show_history(this,${val.user_id})'>開團履歷</button>
                                                        </li>
                                                        <li class="nav-item">
                                                            <button class="nav-link active" id="nav-message-tab${val.product_id}"
                                                                data-bs-toggle="tab" data-bs-target="#nav-message${val.product_id}" type="button"
                                                                role="tab" aria-controls="nav-message"
                                                                aria-selected="false">站內私訊</button>
                                                        </li>
                                                    </ul>
                                                   
                                                    <div class="tab-content" id="nav-tabContent">
                                                        <div class="tab-pane fade" id="nav-vitae${val.product_id}" role="tabpanel"
                                                            aria-labelledby="nav-vitae-tab${val.product_id}">
                                                            <div class="row card-vitae align-items-center">
                                                                <div class="col text-center fs-4">牛肉</div>
                                                                <div class="col text-light">跟團人數 : 33人</div>
                                                            </div>
                                                            <div class="row card-vitae align-items-center">
                                                                <div class="col text-center fs-4">牛肉</div>
                                                                <div class="col text-light">跟團人數 : 33人</div>
                                                            </div>
                                                            <div class="row card-vitae align-items-center">
                                                                <div class="col text-center fs-4">牛肉</div>
                                                                <div class="col text-light">跟團人數 : 33人</div>
                                                            </div>
                                                        </div>
                                                        <div class="tab-pane fade show active" data-product-id="${val.product_id}" data-product-name="${val.shop_name} - ${val.product}" id="nav-message${val.product_id}" role="tabpanel"
                                                            aria-labelledby="nav-message-tab${val.product_id}">
                                                            <form>
                                                                <div class="mb-3 mt-3">
                                                                    <p>在此輸入要詢問的內容，系統將為你送出信件</p>
                                                                </div>
                                                                <div class="mb-3">
                                                                    <textarea class="form-control message-text" 
                                                                        rows="3"></textarea>
                                                                </div>
                                                                <div class="modal-footer">
                                                                    <input type="button" class="btn btn-primary send_mail" value="送出" >                                                        
                                                                </div>
                                                            </form>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>           
        `

    })
};


const show_search_results = async (str) => {          //顯示搜尋結果的function

    var search_data = await axios.get(`/allProducts/search/${str}`);

    if (search_data.data.length === 0) {
        Swal.fire({
            title: '沒有找到資料',
            text: "請重新查詢或檢查錯別字",
            icon: 'info',
            showConfirmButton: true,
        });
    } else {

        search_results.innerHTML = '';
        render_card(search_data, collectList)

    };

}

const titleElement = document.getElementById('top_title');
// 側邊選單依商品標籤，顯示商品
function filterProducts(tag) {


    const products = document.getElementsByClassName('product');

    const showAll = tag === '全部';

    // 設定對應地區的標題
    const titleMap = {
        '中部地區': '中部地區',
        '北部地區': '北部地區',
        '南部地區': '南部地區',
        '東部地區': '東部地區',
        '常溫': '常溫食品',
        '冷藏': '冷藏食品',
        '其他': '其他',
        '尚有時間': '尚有時間',
        '即將到期': '即將到期',
        '已到期': '已到期',
        '全部': '全部團購',
    };

    // 顯示符合標籤的商品，隱藏其他商品
    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        const tags = product.getAttribute('data-tags').split(',');

        if (showAll || tags.includes(tag)) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    }

    // 更改標題
    titleElement.textContent = titleMap[tag];
    sessionStorage.removeItem('place');
}

const Heart = async (heartIcon, pid) => {              //收藏商品的function

    var login_or_not = await axios.get('/userlogin')

    if (login_or_not.data != 'undefined') {

        sessionStorage.setItem('user_id', login_or_not.data.user_id);

        var data_to_server = {

            uid: parseInt(sessionStorage.getItem('user_id')),
            pid: pid,

        }

        if (heartIcon.classList.contains('bi-heart')) {

            var add_fr_results = await axios.post('/add-to-favorites', data_to_server)
            console.log(add_fr_results)
            if (add_fr_results.data.affectedRows === 1) {
                console.log('收藏成功');
                heartIcon.classList.remove('bi-heart');
                heartIcon.classList.add('bi-heart-fill');

            } else {
                alert('收藏失敗');
            }

        } else {
            // console.log(data_to_server)
            var remove_fr_results = await axios.delete('/remove-to-favorites', { data: data_to_server });
            // console.log(remove_fr_results)
            if (remove_fr_results.data.affectedRows === 1) {

                console.log('取消成功');
                heartIcon.classList.remove('bi-heart-fill');
                heartIcon.classList.add('bi-heart');

            } else {
                alert('取消失敗');
            }
        }
    } else {

        Swal.fire({
            title: '您尚未登入',
            text: "請先登入才能使用收藏功能",
            icon: 'info',
            showConfirmButton: true,
        });

    }

};

var show_collect_list = async () => {  //顯示收藏的FUNCTION


    var login_or_not = await axios.get('/userlogin')
    var heart_icon = document.getElementsByClassName('heart_icon');

    if (login_or_not.data != 'undefined') {

        sessionStorage.setItem('user_id', login_or_not.data.user_id);

        var result = await axios.get('/allProducts/favorites');

        titleElement.textContent = '我的收藏';

        if (result.data === 'undefined') {

            Swal.fire({
                title: '您沒有收藏商品',
                text: "",
                icon: 'info',
                showConfirmButton: true,
            });

        } else {

            var heart_icon_array = Array.from(heart_icon);

            var fill_heart_nodes = heart_icon_array.filter(element => element.classList.contains('bi-heart-fill'));
            var no_fill_heart_nodes = heart_icon_array.filter(element => element.classList.contains('bi-heart'));

            fill_heart_nodes.forEach((val, ind) => {
                var fill_card = val.parentNode.parentNode.parentNode.parentNode;
                fill_card.style.display = 'block';
            });

            no_fill_heart_nodes.forEach((val, ind) => {
                var no_fill_card = val.parentNode.parentNode.parentNode.parentNode;
                no_fill_card.style.display = 'none';
            });


        }

    } else {

        Swal.fire({
            title: '您尚未登入',
            text: "請先登入才能使用收藏功能",
            icon: 'info',
            showConfirmButton: true,
        });

    }



}

window.onload = async () => {
    var str = sessionStorage.getItem('seach_content');
    if (str) {
        show_search_results(str);
        sessionStorage.removeItem('seach_content');
    } else {
        var result = await axios.get('/allProducts/favorites');
        if (result.data != 'undefined') {
            collectList = result.data;
        };

        var data_results = await axios.get('/allProducts/cards');
        render_card(data_results, collectList);

        if (sessionStorage.getItem('collectList') === 'true') {
            show_collect_list();
            sessionStorage.removeItem('collectList');
        };

        switch (sessionStorage.getItem('place')) {
            case 'n':
                filterProducts('北部地區')
                break;
            case 'm':
                filterProducts('中部地區')
                break;
            case 's':
                filterProducts('南部地區')
                break;
            case 'e':
                filterProducts('東部地區')
                break;
            case 'o':
                filterProducts('外島地區')
                break;

            default:
                break;
        };

        

        var email_btn = document.getElementsByClassName('send_mail');
        var email_text = document.getElementsByClassName('message-text');
        var email_btn_array = Array.from(email_btn)

        email_btn_array.forEach((val, index) => {

            val.addEventListener("click", async (e) => {

                var pid = e.target.parentNode.parentNode.parentNode.getAttribute('data-product-id');
                var pname = e.target.parentNode.parentNode.parentNode.getAttribute('data-product-name')
                var message = email_text[index].value;
                var data_to_server = {
                    pid: pid,
                    pname: pname,
                    message: message,
                };
                Swal.fire({
                    title: '請稍後...',
                    text: '郵件發送中...',
                    icon: 'info',
                    showConfirmButton: false,
                })
                var email_result = await axios.post("/product/send-email", data_to_server)

                if (email_result.data === "郵件已成功發送") {
                    Swal.close();
                    Swal.fire(
                        '訊息發送成功!',
                        `團主已經收到訊息了，請注意您的信箱！`,
                        'success'
                    );

                } else {
                    Swal.close();
                    Swal.fire({
                        title: '訊息發送失敗',
                        text: email_result.data,
                        icon: 'warning',
                        showConfirmButton: false,
                    });

                    setTimeout(() => { window.location = '/login' }, 2000)
                }

            })

        });

    };

}

search_button.addEventListener("click", function () {

    // 整理表單資料

    var data = search_text.value;

    show_search_results(data);

});

var collectList_btn = document.querySelector('.collectList');

collectList_btn.addEventListener('click', show_collect_list);



const show_history = async (btn, id) => {
    var container = btn.parentNode.parentNode.nextElementSibling.children[0];

    container.innerHTML = '';

    var history_results = await axios.get(`/allProducts/history/${id}`);

    // console.log(history_results.data);

    history_results.data.forEach((val, ind) => {
        // console.log(val)
        container.innerHTML += `
            <a onclick='store_product_id(${val.product_id})' href='/product' class="history_item row card-vitae align-items-center">
              <div class="col text-center fs-4">${val.shop_name}<br/>${val.product}</div>
              <div class="col text-light">跟團人數 : ${val.order_count || 0}人</div>
            </a>`
    })

}


