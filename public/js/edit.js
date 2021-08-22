$(document).ready(function () {
    const id = getValueCookie("id_user");
    $("#id-update").click(function () {
        var title = $("#title").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var description = $("#description").val();
        var data = {title:title,username:username,email:email,phone:phone,description:description};
        // console.log(data);
        $.ajax({
            url : "http://localhost:3000/users/" + id ,
            method: "PUT",
            data:data,
            success:function (data){
                alert("Cập Nhật Thành Công");
                window.location = "?page=edit";
            }
        });
        return false;
    });
    $.ajax({
        url: "http://localhost:3000/users",
        method: "GET",
        success: function (data) {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id == id) {
                    $("#title").val(data[i].title);
                    $("#username").val(data[i].username);
                    $("#email").val(data[i].email);
                    $("#phone").val(data[i].phone);
                    $("#description").val(data[i].description);
                }
            }
        }
    });
});