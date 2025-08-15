// favorites code
let container = document.getElementById("products_container");
container.innerHTML = "";

let favoriteProducts = products.filter(p => favorites.includes(p.id));

if (favoriteProducts.length === 0) {
  container.innerHTML = "<p class='text-center'>لا توجد منتجات في المفضلة</p>";
} else {
  favoriteProducts.forEach(item => {
    const heartIconClass = favorites.includes(item.id) ? "fas" : "far";
    const cat = (item.category || '').toLowerCase();
    const heightImage = cat.includes('phone') ? '330px' : cat.includes('smart') ? '240px' : '200px';

    container.innerHTML += `
      <div class="col-md-4 mb-4 p-3">
        <div class="card border-info h-100">
          <img src="${item.imageURL}" class="card-img-top mx-auto" style="width:80%; height:${heightImage}; object-fit:cover">
          <div class="card-body">
            <p class="card-title mb-1">Product: ${item.title}</p>
            <p class="card-text mb-1">Category: ${item.category}</p>
            <p class="mb-1">Color: ${item.color}</p>
            <p class="mb-2">Price: <span><del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
          </div>
          <div class="d-flex justify-content-between align-items-center p-3">
            <button class="btn btn-danger btn-sm remove-fav" data-id="${item.id}">Remove</button>
            <i id="fav-${item.id}" class="${heartIconClass} fa-heart fav" data-id="${item.id}" style="cursor:pointer"></i>
          </div>
        </div>
      </div>
    `;
  });
}

// حدث لإزالة المنتج من المفضلة
container.addEventListener("click", function(e) {
  if (e.target.classList.contains("remove-fav") || e.target.classList.contains("fav")) {
    const id = parseInt(e.target.dataset.id);
    favorites = favorites.filter(favId => favId !== id);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites(); // إعادة عرض القائمة بعد الحذف
  }
});

function renderFavorites() {
  container.innerHTML = "";
  let favoriteProducts = products.filter(p => favorites.includes(p.id));

  if (favoriteProducts.length === 0) {
    container.innerHTML = "<p class='text-center'>لا توجد منتجات في المفضلة</p>";
    return;
  }

  favoriteProducts.forEach(item => {
    const heartIconClass = favorites.includes(item.id) ? "fas" : "far";
    const cat = (item.category || '').toLowerCase();
    const heightImage = cat.includes('phone') ? '330px' : cat.includes('smart') ? '240px' : '200px';

    container.innerHTML += `
      <div class="col-md-4 mb-4 p-3">
        <div class="card border-info h-100">
          <img src="${item.imageURL}" class="card-img-top mx-auto" style="width:80%; height:${heightImage}; object-fit:cover">
          <div class="card-body">
            <p class="card-title mb-1">Product: ${item.title}</p>
            <p class="card-text mb-1">Category: ${item.category}</p>
            <p class="mb-1">Color: ${item.color}</p>
            <p class="mb-2">Price: <span><del>${item.price} EGP</del> ${item.salePrice} EGP</span></p>
          </div>
          <div class="d-flex justify-content-between align-items-center p-3">
            <button class="btn btn-danger btn-sm remove-fav" data-id="${item.id}">Remove</button>
            <i id="fav-${item.id}" class="${heartIconClass} fa-heart fav" data-id="${item.id}" style="cursor:pointer"></i>
          </div>
        </div>
      </div>
    `;
  });
}
