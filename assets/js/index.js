$("#signout").click(function () {

    $("#loginbut").css("display", "block");
    $("#userdrop1").css("display", "none");
    $("#userdrop").css("display", "none");
    $("#userdrop2").css("display", "none");
    localStorage.setItem("currentLoggedUser", 1)

});
$("#signout1").click(function () {
     localStorage.setItem("currentLoggedUser", 1)
    $("#loginbut").css("display", "block");
    $("#userdrop1").css("display", "none");
    $("#userdrop").css("display", "none");
    $("#userdrop2").css("display", "none");
    
});
$("#signout2").click(function () {
    $("#loginbut").css("display", "block");
    $("#userdrop1").css("display", "none");
    $("#userdrop").css("display", "none");
    $("#userdrop2").css("display", "none");
    localStorage.setItem("currentLoggedUser", 1)
});
window.onload = function () {

    // var token = document.cookie.substring(9);
    // var base64Url = token.split(".")[1];
    // var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    // var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) { return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2); }).join(''));
    // jsonPayload = JSON.parse(jsonPayload);
    // localStorage.setItem("currentLoggedUser", jsonPayload.email);   
    mail = localStorage.getItem("currentLoggedUser")
    alert(mail)
    if (mail == "reddylikitha201@gmail.com") {
        $("#loginbut").css("display", "none");
        $("#userdrop1").css("display", "block");
        $("#userdrop").css("display", "none");
        $("#userdrop2").css("display", "none");
    }
    else if (mail == null || mail == 1) {
        $("#loginbut").css("display", "block");
        $("#userdrop1").css("display", "none");
        $("#userdrop").css("display", "none");
        $("#userdrop2").css("display", "none");
    }
    else if (mail == "saloni@gmail.com") {
        $("#loginbut").css("display", "none");
        $("#userdrop").css("display", "none");
        $("#userdrop1").css("display", "none");
        $("#userdrop2").css("display", "block");

    }
    else {
        $("#loginbut").css("display", "none");
        $("#userdrop").css("display", "block");
        $("#userdrop1").css("display", "none");
        $("#userdrop2").css("display", "none");

    }
};