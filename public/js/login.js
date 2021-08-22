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
function createCookie(name, value, exDay) {
    let now = new Date();
    now.setTime(now.getTime() + exDay * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + value + ";expires=" + now.toUTCString() + ";path=/";
}

function deleteCookie(name) {
    let now = new Date();
    now.setTime(now.getTime() - 60 * 1000);
    document.cookie = name + "=;expires=" + now.toUTCString() + ";path=/";
}

function getValueCookie(name) {
    let cookieStr = document.cookie;
    if (cookieStr) {
        let cookieArray = cookieStr.split("; ");
        for (let i = 0; i < cookieArray.length; i++) {
            let str = cookieArray[i];
            let arr = str.split("=");
            if (arr.length == 2) {
                if (arr[0] == name) {
                    return arr[1];
                }
            }

        }
    }
}
$(document).ready(function () {
    // createCookie('id_user',1);
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
                if (!userExists) {
                    return handleError('Tài khoản không đúng');
                } else {
                    for(let i = 0 ; i < data.length ; i++){
                        if(email == data[i].email){
                            var id = data[i].id;
                        }
                    }
                    createCookie('id_user' , id);
                    window.location = '?page=edit';
                }
            },
            error: function () {
                handleError('Không thể gửi dữ liệu')
            }
        })
        return false
    })
})
