$(document).ready(function () {
    $("#btn-login").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var error = 0;
        var alert;
        $.ajax({
            url: "http://localhost:3000/users",
            method: "GET",
            // data:{username:"vu",password:"vu!@#"},
            success: function (data) {
                if (email == '' || password == '') {
                    error = 1;
                    alert = "Không để trường trống";
                } else {
                    for (let i = 0; i < data.length; i++) {
                        if (email != data[i].email && password != data[i].password) {
                            error = 1;
                            alert = "Tài khoản không tồn tại hệ thống";
                        } else {
                            error = 0;
                        }
                    }
                }

                if (error == 0) {
                    window.location = "?page=edit";
                } else {
                    $(".error").removeClass("d-none");
                    $(".error").text(alert);
                }
            },
            error: function () {
                console.log("Bị Lỗi");
            }
        });
        return false;
    });

});