//============= Hàm Xóa Cookie =================//
function deleteCookie(name) {
    let now = new Date();
    now.setTime(now.getTime() - 60 * 1000);
    document.cookie = name + "=;expires=" + now.toUTCString() + ";path=/";
}
//============= Hàm Xóa Cookie =================//
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
    // -------------- Chức Năng Kiểm Tra Đăng Nhập  --------------//
    /* 
    1.Trước khi loading vào các page cms thì sẽ gọi ajax kiểm tra
    2. Ajax sẽ gọi lấy tất cả users
    3. Lấy id đã lưu từ cookie , cookie này có khi đối tượng người đã đăng nhập thành công
    4. Kiểm tra user có tồn tại hay không bằng id từ cookie
    5. Nếu dúng thì không có chuyện gì xẩy ra còn sai thì sẽ tự động chuyển qua trang login 
    */
    $.ajax({
        url:"http://localhost:3000/users",
        method:"GET",
        success: function(data){
            const id = getValueCookie("id_user");
            let result = false;
            for(let i =0 ; i< data.length ; i++){
                if(data[i].id == id){
                    result = true; 
                }
            }
            if(result == false){
                window.location = "?page=login";
            }

        }
    });
    // -------------- Chức Năng Logout  --------------//
    /*
        1. Chọn đối tượng có logout và cho sự kiện click
        2. Khi click thì xóa cookie (id_user) và chuyển hướng tới page login
    */
    $("a.logout").click(function(){
        deleteCookie("id_user");
        window.location = "?page=login";
        // Return false dùng dể tắt khi chức năng load page của a.logout
        return false;
    });
});