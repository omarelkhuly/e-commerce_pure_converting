// register code
let userName = document.querySelector("#userName");
let password = document.querySelector("#password");
let email = document.querySelector("#email");
let signUPBtn = document.querySelector("#signUP");

window.onload = function () {
    userName.focus();
};

signUPBtn.addEventListener("click", function (e) {
    e.preventDefault();

    if (userName.value === "" || password.value === "" || email.value === "") {
        alert("Please fill all fields");
    } else {
        let users = JSON.parse(localStorage.getItem("users")) || [];

        let existingUser = users.find(u => u.userName === userName.value.trim());
        if (existingUser) {
            alert("User already exists");
            return;
        }

        let newUser = {
            userName: userName.value.trim(),
            password: password.value.trim(),
            email: email.value.trim()
        };
        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", newUser.userName);

        setTimeout(() => {
            window.location = "index.html";
        }, 500);
    }
});