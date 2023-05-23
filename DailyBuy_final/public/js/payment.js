
window.onload = function () {
    //電子發票輸入



    var select2 = document.getElementById('bill_choice');
    select2.addEventListener('change', (event) => {
        var selectedValue2 = event.target.value;

        var cloud_bill_Div = document.getElementById('cloud_bill_no');


        if (selectedValue2 == 'cloud_bill') {
            cloud_bill_Div.classList.remove("d-none");
        } else if (selectedValue2 == 'paper_bill') {
            cloud_bill_Div.classList.add("d-none");


        } else if (selectedValue2 == 'donate_bill') {
            cloud_bill_Div.classList.add("d-none");

        }

    });
    //付款方式切換，底下的div變化功能
    var select = document.getElementById('payment');
    select.addEventListener('change', (event) => {
        var selectedValue = event.target.value;

        var cash_Div = document.getElementById('cash');
        var c_card_Div = document.getElementById('c_card');
        var ATM_Div = document.getElementById('ATM');

        if (selectedValue == '現金') {
            cash_Div.classList.remove("d-none");
            c_card_Div.classList.add("d-none");
            ATM_Div.classList.add("d-none");





        } else if (selectedValue == 'ATM繳款') {
            cash_Div.classList.add("d-none");
            c_card_Div.classList.add("d-none"); // 顯示信用卡、金融卡 div
            ATM_Div.classList.remove("d-none");

        } else if (selectedValue == '線上刷卡') {
            cash_Div.classList.add("d-none");
            c_card_Div.classList.remove("d-none"); // 隱藏 div
            ATM_Div.classList.add("d-none");
        }
    });
    //信用卡的添加功能
    var click = document.querySelector("#increment");
    var incrementDiv = document.querySelector("#increment_c_card");
    // click.addEventListener('click', (event) => {


    //     // 將信用卡表單的 div 樣式從 d-none 改為顯示
    //     // document.querySelector('#increment_form').classList.remove('d-none');
    //     // incrementDiv.classList.add("d-none");

    // })

    //添加完成後顯示在畫面上
    var click2 = document.querySelector("#c_card_form_go");
    click2.addEventListener('click', (event) => {
        event.preventDefault();
        var c_no = document.getElementById("validationServer01").value;
        var newCard = document.createElement('div');
        //console.log(newCard)
        newCard.classList.add('card', 'mb-5', 'ms-4', 'test');
        newCard.style.width = "450px";
        newCard.style.height = "150px";
        newCard.style.flexDirection = "row";
        newCard.innerHTML = `
        <i class="bi bi-pip ms-4 mt-2 " style="font-size:50px"></i>
        <div class="ms-4 " style="margin-top: 30px;font-size: 18px; width:150px;">****\t${c_no.slice(-4)}</div>
        <button type="button" class="btn btn-warning align-items-center"
            style="width: 160px;height: 40px; margin-top: 90px;margin-right: 10px;" id="new_card">添加信用卡</button>
        <button type="button" class="btn btn-warning align-items-center"
            style="width: 160px;height: 40px; margin-top: 90px;margin-right: 10px;" id="delete_card">移除信用卡</button>
        `;
        document.querySelector('#increment_form').classList.add('d-none');
        document.getElementById('c_card').appendChild(newCard);

        var deleteBtn = document.getElementById("delete_card");
        deleteBtn.addEventListener("click", (event) => {
            document.querySelector('.test').classList.add("d-none");
        })

        showFormAndAddClickListener();
    })

    //newCard為動態生成的html元素，必須額外監聽事件
    function showFormAndAddClickListener() {
        document.querySelector('#increment_form').classList.add('d-none');

        var click3 = document.querySelector("#new_card");
        click3.addEventListener('click', (event) => {
            showFormAndAddClickListener();
            var newCard2 = document.createElement('div');
            newCard2.classList.add('card', 'mb-5', 'ms-4', 'justify-content-center')
            newCard2.style.width = "550px";
            newCard2.style.height = "300px";
            newCard2.innerHTML = ` <form class="row g-3 ms-4 me-4    justify-content-center align-items-center">
            <div class="col-md-6">
                <label for="validationServer07" class="form-label" >信用卡號碼
                </label>
                <input type="text" class="form-control " id="validationServer07" required pattern="[0-9]{15,17}">
                <div class="invalid-feedback">
                    信用卡卡號介於15~17個數字
                  </div>
            </div>
            <div class="col-md-3">
                <label for="validationServer08" class="form-label">到期日</label>
                <input type="text" class="form-control " id="validationServer08" required pattern="^0[1-9]|1[0-2]\/[0-9][0-9]$">
                <div class="invalid-feedback">
                    格式為月份/年分末兩碼
                  </div>
            </div>
            <div class="col-md-3">
                <label for="validationServer09" class="form-label">安全碼</label>
                <div class="input-group has-validation">

                    <input type="text" class="form-control " id="validationServer09" required pattern="^\d{3}$">
                    <div class="invalid-feedback">
                        安全碼為3位數字
                      </div>
                  
                </div>
            </div>
            <div class="col-md-6">
                <label for="validationServer10" class="form-label">帳單寄送地址</label>
                <input type="text" class="form-control " id="validationServer10"
                    aria-describedby="validationServer03Feedback" required>
             
            </div>
          
            <div class="col-md-3">
                <label for="validationServer11" class="form-label">郵遞區號</label>
                <input type="text" class="form-control " id="validationServer11"
                    aria-describedby="validationServer05Feedback" required pattern="^\d{3,6}$">
                    <div class="invalid-feedback">
                        郵遞區號為3~6位數字
                      </div>
            </div>
            <div class="col-md-3">
                <label for="validationServer12" class="form-label">持卡人姓名</label>
                <input type="text" class="form-control " id="validationServer12"
                    aria-describedby="validationServer05Feedback" required>
              
            </div>
           
            <div class="col-12">
                <button class="btn btn-warning" type="button" id="c_card_form_go">確定送出</button>
            </div>
        </form>`
            // 在動態生成的"確定送出"按鈕上添加點擊事件監聽器
            var submitBtn = newCard2.querySelector("#c_card_form_go");
            submitBtn.addEventListener('click', (event) => {
                // 防止表單自動提交
                event.preventDefault();


            });
            document.querySelector("#new_card").classList.add("d-none");

            document.getElementById('c_card').appendChild(newCard2);
            showFormAndAddClickListener();
        });
    }

    //信用卡表單的驗證
    //驗證信用卡號
    var card_no = document.getElementById("validationServer01");

    card_no.addEventListener('input', (event) => {
        if (/^\d{15,17}$/.test(card_no.value)) {
            card_no.classList.add('is-valid');
            card_no.classList.remove('is-invalid');
        } else {
            card_no.classList.add('is-invalid');
            card_no.classList.remove('is-valid');
        }

    })
    //   驗證到期日 
    var deadline = document.getElementById("validationServer02");

    deadline.addEventListener('input', (event) => {
        if (/^(0[1-9]|1[0-2])\/([2-9]\d)$/
            .test(deadline.value)) {
            deadline.classList.add('is-valid');
            deadline.classList.remove('is-invalid');
        } else {
            deadline.classList.add('is-invalid');
            deadline.classList.remove('is-valid');
        }

    })
    //   驗證安全碼 
    var safe = document.getElementById("validationServer03");

    safe.addEventListener('input', (event) => {
        if (/^\d{3}$/
            .test(safe.value)) {
            safe.classList.add('is-valid');
            safe.classList.remove('is-invalid');
        } else {
            safe.classList.add('is-invalid');
            safe.classList.remove('is-valid');
        }

    })
    //   驗證郵遞區號 
    var ad = document.getElementById("validationServer05");

    ad.addEventListener('input', (event) => {
        if (/^\d{3,6}$/
            .test(ad.value)) {
            ad.classList.add('is-valid');
            ad.classList.remove('is-invalid');
        } else {
            ad.classList.add('is-invalid');
            ad.classList.remove('is-valid');
        }

    })

    var c_card_button = document.getElementById("c_card_form_go");
    c_card_button.addEventListener("click", (event) => {
        if (!(/^\d{15,17}$/.test(card_no.value)) ||
            !(/^(0[1-9]|1[0-2])\/([2-9]\d)$/
                .test(deadline.value)) ||
            !(/^\d{3}$/
                .test(safe.value)) ||
            !(/^\d{3,6}$/
                .test(ad.value))) {
            alert("請完整填寫信用卡表單或是格式有誤");


        }
    })




};

//axios發出sql請求 商品卡片

var my_store_card = document.getElementById("my_store_card")
var pid = sessionStorage.getItem('product_id');
axios.get(`/payment/card/${pid}`).then(
    (data) => {
        data.data.forEach((val, ind) => {

            my_store_card.innerHTML = (`
             <div class="card col-12  justify-content-center mx-auto d-flex flex-row"
                 style="width: 100%; height: 250px; border-radius: 34px;">
                 <div class="d-flex flex-column justify-content-center align-items-center col-2 ">
                     <img src='${val.pic_url1}' class="store_photo" alt="商品圖" onerror="this.src='/media/logo/logo.png'">
                     <div class=" mb-5 d-flex flex-column">
                         <p class="mt-auto fs-5">${val.country}</p>
                         <p class="mt-auto fs-5">${val.shop_name}${val.product}</p>
                     </div>
                 </div>
                 <div class="container row col-9">
                     <table class="table">
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
                                 <th scope="col" class="text-center justify-content-center p-1">
                                     <img onerror="this.src='/media/member/img_avatar.png'" style="width:60px;border:1px black solid" class="mt-4" src="${val.selfie}" alt="大頭貼">
                                     <p class="mt-3">${val.user_name}</p>
                                 </th>
                                 <th scope="col" class="text-center align-middle p-1" id='product_spec'>${val.spec1}</th>
                                 <th scope="col" class="text-center align-middle p-1" >NT.${val.spec1_price}</th>
                               
                                <th scope="col" class="text-center align-middle p-1"><input style="width: 80px;" type="number"
                                         id="count" value=1 min='1' max='5' required name="quantity" onkeydown="return false">
                                         </th>
                                 <th scope="col" class="text-center align-middle p-1">
                                 <select  class="ms-4 mt-1 font_size" >
                                 <option value="0NT.">NT.0(面交)</option>
                                 <option value="80NT.">NT.80(宅配)</option>
                                 
                             </select>
                           
                             </th>
                                 <th scope="col" class="text-center align-middle p-1" id='product_price'>NT.${parseInt(val.spec1_price)}</th>
                             </tr>
                         </tbody>
                     </table>
                 </div>
             </div>
                     `)

            //共計的累加，包含件數和運費         

            let inputValue = 1;
            let shippingCost = 0;

            my_store_card.addEventListener('input', function (event) {
                if (event.target && event.target.nodeName === 'INPUT') {
                    inputValue = parseInt(event.target.value);
                    updateTotal();
                }
            });

            my_store_card.addEventListener('change', function (event) {
                if (event.target && event.target.nodeName === 'SELECT') {
                    shippingCost = parseInt(event.target.value);
                    updateTotal();
                }
            });

            function updateTotal() {
                const total = (val.spec1_price * inputValue) + shippingCost;
                const totalEl = my_store_card.querySelector('.text-center.align-middle.p-1:last-of-type');
                totalEl.textContent = `NT.${total}`;
            }
        });



    })

//axios發出sql請求 商品卡片

var my_end_date = document.getElementById("end_date")
var my_trade_date = document.getElementById("trade_date")

axios.get(`/payment/date/${pid}`).then(
    (data) => {
        data.data.forEach((val, ind) => {

            my_end_date.innerHTML = (`
            <div class="card col-12   mx-auto d-flex flex-row  align-items-center"
            style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
            <p class="ms-4 mt-4 font_size_title">團購截止時間</p>
            <p class="ms-4 mt-4 font_size">${val.end_date_v2}</p>
        </div>
                     `);



            my_trade_date.innerHTML = (`
                     <div class="card col-12   mx-auto d-flex flex-row  align-items-center"
                     style="width: 100%; height: 70px; border-radius: 0px; background-color: #F3D7A8;">
                     <p class="ms-4 mt-4 font_size_title">預計面交日/出貨日</p>
                     <p class="ms-4 mt-4 font_size " style="color: red;">${val.trade_date_v2}</p>
                     <p class="ms-5 mt-4 font_size_title">商品賞味期限</p>
                     <p class="ms-4 mt-4 font_size " style="color: red;">${val.exp_date}</p>
                 </div>
                              `)


        });



    })

sure_button.addEventListener('click', (event) => {
    event.preventDefault();

    var my_form = new FormData(document.getElementById('my_form'))

    var formObject = {};
    for (var pair of my_form.entries()) {
        formObject[pair[0]] = pair[1];
    }
    var price_int = document.getElementById('product_price').innerHTML.replace('NT', '');
    var new_data = {
        product_spec: document.getElementById('product_spec').innerHTML,
        product_price: price_int,
        quantity: document.getElementById('count').value,
        product_id: sessionStorage.getItem('product_id'),
        user_id: sessionStorage.getItem('user_id')
    };

    var data_to_server = Object.assign({}, formObject, new_data);


    axios.put('/order_data2', data_to_server).then(
        (x) => {
            console.log(x);

            window.location = '/payment/success'

        }
    )
})


