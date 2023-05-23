const sellerform=()=>{

     window.location='/sellerform';

};

var login_state;
window.onload = async () => {
     change1()
     var result1 = await axios.get("/userlogin");
     if (result1.data === 'undefined') {
          login_state = false;
     } else {
          login_state = true;
     }


};


const submit_function = async () => {

     if (login_state === true) {

          var form_wish = document.querySelector(`#form_wish`);

          var data_to_server = new FormData(form_wish);
          for (var pair of data_to_server.entries()) {
               console.log(pair[0] + ': ' + pair[1]);
          };
          var formDataObject = Object.fromEntries(data_to_server.entries());
          var insert_result = await axios.post('/wish/insertwish', formDataObject);

          if (insert_result.data.affectedRows === 1) {

               Swal.fire("許願成功", "新稱願望清單成功", "success");

          } else {

               Swal.fire("許願失敗", "新稱願望清單失敗", "warning");
          }


     } else {

          Swal.fire("請先登入", "即將跳轉至登入頁面", "info");

          setTimeout(() => {
               window.location = 'login'
          }, 2000)

     }



}

var plus_1 = async (count, id) => {

     if (login_state === true) {
          var wish_num = document.getElementById(`count_num_${id}`);
          // wish_num.innerHTML = '';
          var data_to_server = {
               count: parseInt(count) + 1,
               id: id
          };

          var plus_1_result = await axios.post("/wish/wishcount", data_to_server);

          if (plus_1_result.data.affectedRows === 1) {
               wish_num.innerHTML = count + 1;
          } else { alert('error') }
     } else {

          Swal.fire("請先登入", "即將跳轉至登入頁面", "info");

          setTimeout(() => {
               window.location = 'login'
          }, 2000)

     }
}

var change1 = async () => {
     change_box_3.style.display = 'none';
     change_box_2.style.display = 'none';
     change_box_1.style.display = 'block';

}
var change2 = async () => {

     var form2 = document.getElementById('form2')
     change_box_3.style.display = 'none';
     change_box_1.style.display = 'none';
     change_box_2.style.display = 'block';

     var wish_list_results = await axios.get("/wish/select");


     wish_list_results.data.forEach((val, ind) => {
          var count;
          if (isNaN(parseInt(val.count))) {
               count = 0;
          } else {
               count = parseInt(val.count)
          }
          var wish_date = new Date(val.wish_end_date).toLocaleDateString();

          form2.innerHTML += ` 
           <div class="rounded">
          <div class="d-flex align-items-center mt-5 me-5">
            <div class="" style="margin-right: 5%; margin-left: 10%">
              <h3 class="">${val.shop_name}</h3>
              <h3 class="">${val.product}</h3>
            </div>
            <div style="margin-right: 5%">
              <h5 class="d_person1" style="display: inline">
                <p id='count_num_${val.wish_id}' style="color: white; font-size: 200%">${count}</p>
                人參與許願這個產品
              </h5>
              <p>團購時間:${wish_date}</p>
            </div>
            <button id="add1" class="add_color add1 ms-2 mt-1" onclick='plus_1(${count},${val.wish_id})'>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="80"
                height="80"
                fill="white"
                class="bi bi-bag-heart-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M11.5 4v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5ZM8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1Zm0 6.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
                ></path></svg>+1
            </button>
            <div class="d-flex justify-content-end me-5">
            <button class="mb-2 go" type="button" onclick="sellerform()">
              開團去<svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                fill="currentColor"
                class="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                ></path></svg
              >
            </button>
          </div>
        </div>
          </div>
        </div>`


     })

}
var change3 = async () => {
     var form3 = document.getElementById('form3');
     form3.innerHTML = '';
     change_box_1.style.display = 'none';
     change_box_2.style.display = 'none';
     change_box_3.style.display = 'block';

     if (login_state === true) {

          var my_wish_results = await axios.get("/wish/collect");
          my_wish_results.data.forEach((val, ind) => {
               var count;
               if (isNaN(parseInt(val.count))) {
                    count = 0;
               } else {
                    count = parseInt(val.count)
               }
               var wish_date = new Date(val.wish_end_date).toLocaleDateString();
               form3.innerHTML += `<div class="rounded">
          <div class="d-flex mt-5" style="margin-left: 15%">
            <div class="me-5">
              <h3 class="">${val.shop_name}</h3>
              <h3 class="">${val.product}</h3>
            </div>
            <div>
              <h5 class="d_person18" style="display: inline">
                <p style="color: white; font-size: 200%">${count}</p>
                人參與許願這個產品
              </h5>

              <p>團購時間:${wish_date}</p>
            </div>
          </div>
          `;
          });
          // console.log(my_wish_results)

     } else {

          Swal.fire("請先登入", "即將跳轉至登入頁面", "info");

          setTimeout(() => {
               window.location = 'login'
          }, 2000)

     }
}