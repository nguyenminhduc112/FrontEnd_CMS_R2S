function getFormError(email, password) {
    // Validate trường trống thì dùng thuộc tính HTML required cho <input>
    // Không cần check bằng JavaScript

    const EMAIL_REGEX = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
    if (!EMAIL_REGEX.test(email))
        return 'Email is invalid'
    if (email.length < 5)
        return 'Email is too short'
    if (email.length > 30)
        return 'Email is too long'
    if (password.length < 8)
        return 'Password is too short'
    if (password.length > 30)
        return 'Password is too long'

    return null
}

function handleError(message) {
	$(".error").removeClass("d-none");
	$(".error").text(message);
	// $("#password").val("");
	return false
}

$(document).ready(function () {
    $("#btn-login").click(function () {
        const email = $("#email").val()
        const password = $("#password").val()

		const error = getFormError(email, password)
        if (error)
            return handleError(error)

        $.ajax({
            url: 'http://localhost:3000/users',
            method: 'get', // Get chứ không phải post,
            success: function (data) {
				const userExists = data.find(user =>
					user.email === email && user.password === password)
                if (!userExists)
                    return handleError('User not found')
                window.location = '?page=edit'
            },
            error: function () {
                handleError('Can not get data')
            }
        })
		return false
    })
})
