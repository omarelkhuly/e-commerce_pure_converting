let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let signInBtn = document.querySelector("#signIn");

window.onload = function () {
    userName.focus();
};

signInBtn.addEventListener("click", function (e) {
    e.preventDefault();

    let users = JSON.parse(localStorage.getItem("users")) || [];

    if (userName.value === "" || password.value === "") {
        alert("Fill Your Data");
    } else {
        let foundUser = users.find(u =>
            u.userName === userName.value.trim() &&
            u.password === password.value.trim()
        );

        if (foundUser) {
            localStorage.setItem("isLoggedIn", "true");
            localStorage.setItem("currentUser", foundUser.userName);
            setTimeout(() => {
                window.location = "index.html";
            }, 500);
        } else {
            alert("Not valid");
        }
    }
});
