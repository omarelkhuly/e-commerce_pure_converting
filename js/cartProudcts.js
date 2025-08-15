// cartproudcts code
let productsContainer = document.querySelector(".products");
let totalPriceEl = document.querySelector(".totalPrice");

function loadCartProducts() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    productsContainer.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        productsContainer.innerHTML = `<p class="text-center w-100">No products in the cart</p>`;
        totalPriceEl.textContent = "0";
        return;
    }

    cart.forEach((product, index) => {
        total += product.price * product.quantity;
        productsContainer.innerHTML += `
            <div class="col-md-4 mb-3">
                <div class="card p-2">
                    <img src="${product.imageURL}" class="card-img-top" alt="${product.name}">
                    <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text">Price: ${product.price} EGP</p>
                        <p class="card-text">
                            Quantity: 
                            <button class="btn btn-sm btn-outline-secondary" onclick="decreaseQuantity(${index})">-</button>
                            <span id="quantity-${index}">${product.quantity}</span>
                            <button class="btn btn-sm btn-outline-secondary" onclick="increaseQuantity(${index})">+</button>
                        </p>
                        <p class="card-text font-weight-bold">Total: ${(product.price * product.quantity).toFixed(2)} EGP</p>
                        <button class="btn btn-danger btn-sm" onclick="removeFromCart(${index})">Remove</button>
                    </div>
                </div>
            </div>
        `;
    });

    totalPriceEl.textContent =total.toLocaleString() + " EGP";
}

function increaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart[index].quantity++;
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartProducts();
}

function decreaseQuantity(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    if (cart[index].quantity > 1) {
        cart[index].quantity--;
    } else {
        cart.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartProducts();
}

function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    loadCartProducts();
}

loadCartProducts();
