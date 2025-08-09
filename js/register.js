let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let signUPBtn = document.querySelector("#signUP");

window.onload = function() {
    userName.focus();
};

signUPBtn.addEventListener("click", function(e){
    e.preventDefault();
    if (userName.value === "" || password.value === "" || email.value === "") {
        alert("Please fill all fields");
    } else {
        localStorage.setItem("userName" , userName.value.trim());
        localStorage.setItem("password" , password.value.trim());
        localStorage.setItem("email" , email.value.trim());
        localStorage.setItem("isLoggedIn", "false");
        setTimeout(() => {
            window.location = "login.html";
        }, 500);
    }
});
