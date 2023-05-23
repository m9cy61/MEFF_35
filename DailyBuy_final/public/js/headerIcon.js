window.onload = function () {
    axios.get("/userlogin")
        .then(response => {
            console.log('//////////////////////////')
            console.log(response.data.selfie)
            console.log('//////////////////////////')
            if (typeof response.data.selfie === "undefined") {
                document.querySelector("#member_icon").src = "/media/logo/member_icon.png";
            }else{
                document.querySelector("#member_icon").src = response.data.selfie
            }
        })
        .catch(error => {
            document.querySelector("#member_icon").src = "/member_icon.png";
        });
}