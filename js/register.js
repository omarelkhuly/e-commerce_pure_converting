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
        // جلب بيانات المستخدمين القديمة
        let users = JSON.parse(localStorage.getItem("users")) || [];

        // التحقق إن كان المستخدم مسجل من قبل
        let existingUser = users.find(u => u.userName === userName.value.trim());
        if (existingUser) {
            alert("User already exists");
            return;
        }

        // إضافة المستخدم الجديد
        users.push({
            userName: userName.value.trim(),
            password: password.value.trim(),
            email: email.value.trim()
        });

        // حفظ المصفوفة في LocalStorage
        localStorage.setItem("users", JSON.stringify(users));
        localStorage.setItem("isLoggedIn", "false");

        setTimeout(() => {
            window.location = "login.html";
        }, 500);
    }
});
