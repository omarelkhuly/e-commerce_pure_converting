let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logOut");

// إخفاء افتراضي لكل العناصر الخاصة بالمستخدم
userInfo.style.display = "none";
user.style.display = "none";
if (logOutBtn) logOutBtn.style.display = "none";

// تحقق من حالة تسجيل الدخول
if (localStorage.getItem("userName") && localStorage.getItem("isLoggedIn") === "true") {
    if (links) {
        links.classList.remove("d-flex");
        links.classList.add("d-none");
    }
    if (user) user.style.display = 'block';
    if (userInfo) userInfo.style.display = "flex";
    if (logOutBtn) logOutBtn.style.display = "inline-block";  // عرض زر تسجيل الخروج
    if (user) user.innerHTML = "Welcome " + localStorage.getItem("userName");
} else {
    if (links) {
        links.classList.remove("d-none");
        links.classList.add("d-flex");
    }
    if (logOutBtn) logOutBtn.style.display = "none"; // إخفاء زر تسجيل الخروج إذا لم يتم تسجيل الدخول
}

// حدث الضغط على زر تسجيل الخروج
if (logOutBtn) {
    logOutBtn.addEventListener("click", (e) => {
        e.preventDefault(); // لمنع الرابط من التنقل الفوري
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("userName");
        localStorage.removeItem("password");
        localStorage.removeItem("email");
        setTimeout(() => {
            window.location = "index.html";
        }, 500);
    });
}
