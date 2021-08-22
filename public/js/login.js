function getFormError(email, password) {
    // Validate trường trống thì dùng thuộc tính HTML required cho <input>
    // Không cần check bằng JavaScript

    const EMAIL_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (email == '') {
        return "Email không được để trống";
    } else {
        if (!EMAIL_REGEX.test(email))
            return 'Email không đúng định dạng';
        if (email.length < 8)
            return 'Email quá ngắn phải trên 8 ký tự';
        if (email.length > 32)
            return 'Email quá dài phải dưới 32 ký tự';
    }
    if (password == '') {
        return "Password không được để trống";
    } else {
        if (password.length < 5)
            return 'Password quá ngắn phải trên 5 ký tự';
        if (password.length > 50)
            return 'Password quá dài phải dưới 50 ký tự';
    }


    return null;
}

function handleError(message) {
    $(".error").removeClass("d-none");
    $(".error").text(message);
    $("#password").val("");
    return false;
}

$(document).ready(function () {
    $("#btn-login").click(function () {
        const email = $("#email").val();
        const password = $("#password").val();

        const error = getFormError(email, password);
        if (error)
            return handleError(error);

        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'get', // Get chứ không phải post,
            success: function (data) {
                const userExists = data.find(user =>
                    user.email === email && user.password === password)
                if (!userExists)
                    return handleError('Tài khoản không đúng');
                window.location = '?page=edit';
            },
            error: function () {
                handleError('Không thể gửi dữ liệu')
            }
        })
        return false
    })
})
