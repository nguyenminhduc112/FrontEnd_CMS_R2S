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
    $("a.logout").click(function(){
        deleteCookie("id_user");
        window.location = "?page=login";
        return false;
    });
});