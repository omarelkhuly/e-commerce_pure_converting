function isUserLoggedIn() {
    return localStorage.getItem("isLoggedIn") === "true";
}

const noInternet = document.querySelector('.noInternet');
function checkInternet() {
    if (!noInternet) return;
    noInternet.style.display = navigator.onLine ? 'none' : 'block';
}
window.addEventListener('online', checkInternet);
window.addEventListener('offline', checkInternet);
checkInternet();

const products = [
    { id: 1, title: "Dell G15-5520", category: "Laptop", color: "Black", price: 36870, salePrice: 36270, imageURL: "images/Labtop1.jpg" },
    { id: 2, title: "Lenovo V15", category: "Laptop", color: "Gray", price: 13333, salePrice: 13011, imageURL: "images/Labtop2.jpg" },
    { id: 3, title: "HP Victus", category: "Laptop", color: "Black", price: 47699, salePrice: 47438, imageURL: "images/Labtop3.jpg" },
    { id: 4, title: "Dell Vostro", category: "Laptop", color: "Black", price: 29660, salePrice: 29320, imageURL: "images/Labtop4.jpg" },
    { id: 5, title: "R50i", category: "Earbuds", color: "Black", price: 1699, salePrice: 1399, imageURL: "images/Earbuds1.jpg" },
    { id: 6, title: "R100", category: "Earbuds", color: "White", price: 1600, salePrice: 1499, imageURL: "images/Earbuds.jpg" },
    { id: 7, title: "Life P2", category: "Earbuds", color: "Black", price: 2899, salePrice: 2699, imageURL: "images/Earbuds3.jpg" },
    { id: 8, title: "Life Note E", category: "Earbuds", color: "Black", price: 2485, salePrice: 1600, imageURL: "images/Earbuds4.jpg" },
    { id: 9, title: "Generic", category: "Over Ear", color: "Blue", price: 215, salePrice: 185, imageURL: "images/Over Ear1.jpg" },
    { id: 10, title: "Panduo", category: "Smart Watch", color: "Green", price: 450, salePrice: 375, imageURL: "images/smartwatch1.jpg" },
    { id: 11, title: "Muktrics", category: "Smart Watch", color: "Black", price: 400, salePrice: 350, imageURL: "images/smartwatch2.jpg" },
    { id: 12, title: "BigPlayer", category: "Smart Watch", color: "Brown", price: 730, salePrice: 650, imageURL: "images/smartwatch3.jpg" },
    { id: 13, title: "Samsung Galaxy A34", category: "Phone", color: "Silver", price: 11286, salePrice: 10400, imageURL: "images/phone1.jpg" },
    { id: 14, title: "A24", category: "Phone", color: "Black", price: 49900, salePrice: 38090, imageURL: "images/phone2.jpg" },
    { id: 15, title: "Oppo Reno 8T", category: "Phone", color: "Gray", price: 12793, salePrice: 12445, imageURL: "images/phone3.jpg" },
    { id: 16, title: "Galaxy S22", category: "Phone", color: "Green", price: 24299, salePrice: 24899, imageURL: "images/phone4.jpg" },
    { id: 17, title: "Galaxy S22 Ultra", category: "Phone", color: "Phantom Black", price: 32800, salePrice: 33400, imageURL: "images/phone5.jpg" },
    { id: 18, title: "Galaxy S21", category: "Phone", color: "Light Green", price: 21990, salePrice: 19299, imageURL: "images/phone6.jpg" },
    { id: 19, title: "Galaxy Z Fold5", category: "Phone", color: "Light Blue", price: 73930, salePrice: 66000, imageURL: "images/phone7.jpg" }
];

const allProducts = document.querySelector(".products");
const badge = document.querySelector(".badge");
const buyProudect = document.querySelector(".buyProudect");
const totalPrice = document.querySelector(".totalPrice");
const shoppingCartIcon = document.querySelector(".shoppingCart");
const cartsProudect = document.querySelector(".cartsProudect");
const search = document.getElementById("search");
const searchOption = document.getElementById("searchOption");

let cart = JSON.parse(localStorage.getItem("cart")) || [];
cart = cart.map(i => ({ ...i, quantity: i.quantity || 1 }));
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

function createProductCard(item) {
    const inCart = cart.some(p => p.id === item.id);
    const heartIconClass = favorites.includes(item.id) ? "fas" : "far";
    const cat = (item.category || '').toLowerCase();
    const heightImage = cat.includes('phone') ? '330px' : cat.includes('smart') ? '240px' : '200px';
    return `
    <div class="product-item col-md-4 mb-4 p-3">
      <div class="card border-info h-100">
        <img src="${item.imageURL}" class="card-img-top mx-auto" style="width:80%; height:${heightImage}; object-fit:cover">
        <div class="card-body">
          <p class="card-title mb-1">Product: ${item.title}</p>
          <p class="card-text mb-1">Category: ${item.category}</p>
          <p class="mb-1">Color: ${item.color}</p>
          <p class="mb-2">Price: <span><del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
        </div>
        <div class="d-flex justify-content-between align-items-center p-3">
          <button class="btn btn-primary btn-sm add-cart" data-id="${item.id}">Add To Cart</button>
          <button class="btn btn-danger btn-sm remove-cart" data-id="${item.id}" ${inCart ? '' : 'style="display:none"'}>Remove</button>
          <i id="fav-${item.id}" class="${heartIconClass} fa-heart fav" data-id="${item.id}" style="cursor:pointer"></i>
        </div>
      </div>
    </div>
  `;
}

function renderProducts(list) {
    if (!allProducts) return;
    allProducts.innerHTML = list.map(createProductCard).join('');
}

if (allProducts) {
    allProducts.addEventListener('click', function (e) {
        const addBtn = e.target.closest('.add-cart');
        const removeBtn = e.target.closest('.remove-cart');
        const favBtn = e.target.closest('.fav');
        if (addBtn) addToCart(+addBtn.dataset.id);
        if (removeBtn) removeFromCart(+removeBtn.dataset.id);
    });
}

function addToCart(id) {
    if (!isUserLoggedIn()) {
        alert("يجب تسجيل الدخول أولاً قبل إضافة المنتج للسلة");
        window.location = "login.html";
        return;
    }
    const product = products.find(p => p.id === id);
    if (!product) return;
    const inCart = cart.find(p => p.id === id);
    if (inCart) inCart.quantity++;
    else cart.push({ ...product, quantity: 1 });
    saveCart();
    renderProducts(products);
}

function removeFromCart(id) {
    cart = cart.filter(p => p.id !== id);
    saveCart();
    renderProducts(products);
}

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    const total = cart.reduce((sum, item) => sum + (+item.salePrice) * (+item.quantity), 0);
    if (totalPrice) totalPrice.textContent = total + " EGP";
    if (badge) {
        badge.textContent = cart.length;
        badge.style.display = cart.length ? 'inline-block' : 'none';
    }
    renderCartDropdown();
}

function renderCartDropdown() {
    if (!buyProudect) return;
    buyProudect.innerHTML = cart.map(item => `
    <div id="buyProudectItem-${item.id}" class="row my-2 align-items-center">
      <span class="col-6">${item.title}</span>
      <span class="col-2" id="quantity-${item.id}">${item.quantity}</span>
      <button class="text-danger mins col-1 btn btn-link p-0" data-id="${item.id}">-</button>
      <button class="text-success pls col-1 btn btn-link p-0" data-id="${item.id}">+</button>
    </div>
  `).join('');
}

if (buyProudect) {
    buyProudect.addEventListener('click', function (e) {
        const plus = e.target.closest('.pls');
        const minus = e.target.closest('.mins');
        if (plus) {
            const id = +plus.dataset.id;
            const item = cart.find(p => p.id === id);
            if (!item) return;
            item.quantity++;
            saveCart();
        }
        if (minus) {
            const id = +minus.dataset.id;
            const item = cart.find(p => p.id === id);
            if (!item) return;
            item.quantity--;
            if (item.quantity <= 0) removeFromCart(id);
            else saveCart();
        }
    });
}

function toggleFavorite(productId, iconElement) {
    if (!isUserLoggedIn()) {
        alert("يجب تسجيل الدخول أولاً قبل إضافة المنتج للمفضلة");
        window.location = "login.html";
        return;
    }
    if (!iconElement) return;
    if (favorites.includes(productId)) {
        favorites = favorites.filter(id => id !== productId);
        iconElement.classList.remove("fas");
        iconElement.classList.add("far");
    } else {
        favorites.push(productId);
        iconElement.classList.remove("far");
        iconElement.classList.add("fas");
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderProducts(products);
}

document.addEventListener("click", function (e) {
    if (e.target.classList.contains("fav")) {
        const id = parseInt(e.target.dataset.id);
        toggleFavorite(id, e.target);
    }
});

let modeSearch = "title";
if (searchOption) {
    searchOption.addEventListener("change", function () {
        modeSearch = this.value;
        if (search) {
            search.placeholder = `Search By ${modeSearch.charAt(0).toUpperCase() + modeSearch.slice(1)}`;
            search.value = '';
            renderProducts(products);
        }
    });
}

function searchData(value) {
    const val = (value || '').toString().trim().toLowerCase();
    const filtered = products.filter(item => ((item[modeSearch] || '')).toString().toLowerCase().includes(val));
    renderProducts(filtered);
}

if (shoppingCartIcon && cartsProudect) {
    shoppingCartIcon.addEventListener('click', function () {
        cartsProudect.classList.toggle('d-none');
    });
}

renderProducts(products);
saveCart();
