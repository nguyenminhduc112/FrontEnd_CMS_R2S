$(document).ready(function () {
    // -------------- Edit Info User--------------//
    /*
        1. Khi click vào nút cập nhật Lấy ra các dữ liêu từ form như : title , username , email , phone,description ,password
        2. Gọi ajax với phương thức PUT là cập nhật thông tin  với id lấy từ cookie , url : "http://localhost:3000/users/" + id 
        3. Khi cập nhật thành công thì thông báo cho người dùng và load lại page
    */
    // Lấy id từ cookie có tên id_user
    const id = getValueCookie("id_user");
    $("#id-update").click(function () {
        var title = $("#title").val();
        var username = $("#username").val();
        var email = $("#email").val();
        var phone = $("#phone").val();
        var description = $("#description").val();
        var password = $("#password").val();
        var data = {title:title,username:username,email:email,password:password,phone:phone,description:description};
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
    // -------------- Show Info User--------------//
    /*
        1.Khi vừa loading vào page edit gọi ajax
        2. Ajax lấy tất cả user kiểm tra lấy user login dữa vào id đã lưu trên cookie và show ra từng thông tin mà user đó có
    */
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
                    $("#password").val(data[i].password);
                    $("#description").val(data[i].description);
                }
            }
        }
    });
});