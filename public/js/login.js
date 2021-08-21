$(document).ready(function () {
    $("#btn-login").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var filter_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var error = 0;
        var alert;
        if (email == '' || password == '') {
            error = 1;
            alert = "Không để trường trống";
        } else if (email.length > 50) {
            error = 1;
            alert = "Email Chỉ Giới Hạn 50 Ký Tự";
        } else if (password.length > 30) {
            error = 1;
            alert = "Password Chỉ Giới Hạn 30 Ký Tự";
        } else if (!filter_email.test(email)) {
            error = 1;
            alert = "Email Không Đúng Định Dạng";

        } else {
            $.ajax({
                url: "http://localhost:3000/users",
                method: "GET",
                // data:{username:"vu",password:"vu!@#"},
                success: function (data) {
                    {
                        for (let i = 0; i < data.length; i++) {
                            if (email != data[i].email && password != data[i].password) {
                                error = 1;
                                alert = "Tài khoản không tồn tại hệ thống";
                            } else {
                                error = 0;
                            }
                        }
                    }
                },
                error: function () {
                    console.log("Bị Lỗi");
                }
            });
        }
        if (error == 0) {
            window.location = "?page=edit";
        } else {
            $(".error").removeClass("d-none");
            $(".error").text(alert);
            $("#password").val("");
        }
        return false;
    });
});