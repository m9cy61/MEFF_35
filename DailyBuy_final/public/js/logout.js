// const { default: axios } = require("axios");
// const { response } = require("express");

// 登出
var logout = document.querySelector('#logout');
logout.onclick = function () {
    console.log('登出鈕按下')
    axios.post('/logout')
        .then(response => {
            //登出成功
            Swal.fire(
                '登出成功',
                '',
                'success'
            )
            setTimeout(() => {
                window.location.href = response.data.redirectUrl;
            }, 3000)
        })
        .catch(error => {
            //登出失敗
        })
}