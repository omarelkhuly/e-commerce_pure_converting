let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logOut");

userInfo.style.display = "none";
user.style.display = "none";
if (logOutBtn) logOutBtn.style.display = "none";

if (localStorage.getItem("userName") && localStorage.getItem("isLoggedIn") === "true") {
    if (links) {
        links.classList.remove("d-flex");
        links.classList.add("d-none");
    }
    if (user) user.style.display = 'block';
    if (userInfo) userInfo.style.display = "flex";
    if (logOutBtn) logOutBtn.style.display = "inline-block";
    if (user) user.innerHTML = "Welcome " + localStorage.getItem("userName");
} else {
    if (links) {
        links.classList.remove("d-none");
        links.classList.add("d-flex");
    }
    if (logOutBtn) logOutBtn.style.display = "none";
}

if (logOutBtn) {
    logOutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.setItem("isLoggedIn", "false"); // لا نحذف بيانات المستخدم
        setTimeout(() => {
            window.location = "index.html";
        }, 500);
    });
}