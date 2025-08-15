// user code
let userInfo = document.querySelector("#userInfo");
let user = document.querySelector("#user");
let links = document.querySelector("#links");
let logOutBtn = document.querySelector("#logOut");

if (userInfo) userInfo.style.display = "none";
if (user) user.style.display = "none";
if (logOutBtn) logOutBtn.style.display = "none";

let isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
let currentUser = localStorage.getItem("currentUser");

if (isLoggedIn && currentUser) {
    if (links) {
        links.classList.remove("d-flex");
        links.classList.add("d-none");
    }
    if (user) {
        user.style.display = 'block';
        user.innerHTML = "Welcome " + currentUser;
    }
    if (userInfo) userInfo.style.display = "flex";
    if (logOutBtn) logOutBtn.style.display = "inline-block";
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
        localStorage.setItem("isLoggedIn", "false");
        localStorage.removeItem("currentUser");
        setTimeout(() => {
            window.location = "index.html";
        }, 300);
    });
}
