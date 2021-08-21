$(document).ready(function () {
    $("#btn-register").click(function () {
        var email = $("#email").val();
        var password = $("#password").val();
        var username = $("#username").val();
        var repassword = $("#repassword").val();
        var filter_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        var error = 0;
        var alert_error = new Array;
        // Kiểm tra username
        if (username == '') {
            error = 1;
            alert_error['username'] = "Username Không Được Để Trống";
        } else {
            if (username.length > 30) {
                error = 1;
                alert_error['username'] = "Username Chỉ Giới Hạn 30 Ký Tự";
            }
        }
        // Kiểm tra email
        if (email == '') {
            error = 1;
            alert_error['email'] = "Email Không Được Để Trống";
        } else {
            if (email.length > 50) {
                error = 1;
                alert_error['email'] = "Email Chỉ Giới Hạn 50 Ký Tự";
            }
            if (!filter_email.test(email)) {
                error = 1;
                alert_error['email'] = "Email Không Đúng Định Dạng";
            }
        }
        // Kiểm tra password
        if (password == '') {
            error = 1;
            alert_error['password'] = "Password Không Được Để Trống";
        } else {
            if (password.length > 30) {
                error = 1;
                alert_error['password'] = "Password Chỉ Giới Hạn 30 Ký Tự";
            }
        }
        // Kiểm tra repassword
        if (repassword == '') {
            error = 1;
            alert_error['repassword'] = "Repassword Không Được Để Trống";
        } else {
            if (repassword.length > 30) {
                error = 1;
                alert_error['repassword'] = "Repassword Chỉ Giới Hạn 30 Ký Tự";
            }
            if (password != repassword) {
                error = 1;
                alert_error['repassword'] = "Xác Nhận Passowrd Không Đúng";
            }
        }
        // Kiểm tra email đã dược sử dụng
        // if (error == 0) {
        //     $.ajax({
        //         url: "http://localhost:3000/users",
        //         method: "GET",
        //         success: function (data) {
        //             for (let i = 0; i < data.length; i++) {
        //                 if (data[i].email == email) {
        //                     error = 2;
        //                     alert_error['error'] = "Email Đã Sử Dụng";
        //                 }
        //             }
        //         }
        //     });
        // }

        if (error == 0) {
            $.ajax({
                url: "http://localhost:3000/users",
                method: "POST",
                data: {
                    username: username,
                    password: password,
                    email: email,
                    title: ""
                },
                success: function (data) {
                    alert("Đăng Ký Thành Công");
                    window.location = "?page=login";
                },
                error: function () {
                    console.log("Thêm Không thành công");
                }
            });
        } else {
            $("#error").removeClass("d-none");
            $("#error-username").removeClass("d-none");
            $("#error-password").removeClass("d-none");
            $("#error-repassword").removeClass("d-none");
            $("#error-email").removeClass("d-none");
            $("#error-username").text(alert_error['username']);
            $("#error").text(alert_error['error']);
            $("#error-password").text(alert_error['password']);
            $("#error-repassword").text(alert_error['repassword']);
            $("#error-email").text(alert_error['email']);
            $("#password").val("");
            $("#repassword").val("");
        }
        return false;
    });
});