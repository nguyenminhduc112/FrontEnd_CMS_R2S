function getFormError(email,username, password, repassword) {
    // Validate trường trống thì dùng thuộc tính HTML required cho <input>
    // Không cần check bằng JavaScript

    const EMAIL_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (username == '') {
        return "Username không được để trống";
    } else {
        if (username.length < 3) {
            return "Username quá ngắn phải trên 3 ký tự";
        }
        if (username.length > 30) {
            return "Username quá dài phải dưới 30 ký tự";
        }
    }
    if (email == '') {
        return "Email không được để trống";
    } else {
        if (!EMAIL_REGEX.test(email))
            return 'Email không đúng định dạng';
        if (email.length < 5)
            return 'Email quá ngắn phải trên 5 ký tự';
        if (email.length > 50)
            return 'Email quá dài phải dưới 50 ký tự';
    }
    if (password == '') {
        return "Password không được để trống";
    } else {
        if (password.length < 8)
            return 'Password quá ngắn phải trên 8 ký tự';
        if (password.length > 30)
            return 'Password quá dài phải dưới 30 ký tự';
    }
    if (repassword == '') {
        return "Repassword không được để trống";
    } else {
        if(password != repassword)
            return "Xác nhận password không đúng";
        if (repassword.length < 8)
            return 'Repassword quá ngắn phải trên 8 ký tự';
        if (repassword.length > 30)
            return 'Repassword quá dài phải dưới 30 ký tự';
    }

    return null;
}

function handleError(message) {
    $(".error").removeClass("d-none");
    $(".error").text(message);
    $("#password").val("");
    $("#repassword").val("");
    // $("#password").val("");
    return false;
}
$(document).ready(function () {
    $("#btn-register").click(function () {
        const email = $("#email").val();
        const password = $("#password").val();
        const username = $("#username").val();
        const repassword = $("#repassword").val();
        const error = getFormError(email, username, password, repassword);
        if (error)
            return handleError(error);

        // Kiểm tra email đã dược sử dụng

        $.ajax({
            url: "http://localhost:3000/users",
            method: "GET",
            success: function (data) {
                const emailExists = data.find(user =>
                    user.email === email)
                if (emailExists) {
                    return handleError('Email đã sử dụng');
                } else {
                    $.ajax({
                        url: "http://localhost:3000/users",
                        method: "POST",
                        data:{username:username,email:email,password:password,title:"",description:"",phone:""},
                        success: function (data) {
                           alert("Đăng Ký Thành Công Tài Khoản Với Email " + email);
                           window.location = '?page=login';

                        },
                        error: function () {
                            handleError('Không Thể Kiểm Tra Dữ Liệu');
                        }
                    });
                }
            },
            error: function () {
                handleError('Không Thể Kiểm Tra Dữ Liệu');
            }
        });

        return false;
    });
});