var url = new URL(window.location.href);
if (!url.searchParams.has("filterParameter")) {
  url.search += (url.search ? "&" : "?") + "filterParameter=filterValue";
}

// ============================== Filter ==============================
// Filter Products
const filterByCategory = (category) => {
  url.searchParams.set("category", category);
  const newUrl = url;
  history.pushState({ category }, null, newUrl);
  renderData();
};

// Filter Price
const filterByPrice = (price1, price2) => {
  url.searchParams.set("price1", price1);
  url.searchParams.set("price2", price2);
  const newUrl = url;
  history.pushState({ price1, price2 }, null, newUrl);
  renderData();
};

// Filter Sizes
const filterBySize = (size) => {
  url.searchParams.set("size", size);
  const newUrl = url;
  history.pushState({ size }, null, newUrl);
  renderData();
};

// ============================== Render Data ==============================
const renderData = async () => {
  const response = await fetch("http://localhost:4001/api/products");
  const data = await response.json();
  const productList = document.getElementById("product-list");
  let dataRender = data.products;
  let params = new URL(document.location).searchParams;

  let searchQuery = params.get("search");
  let category = params.get("category");
  let price1 = params.get("price1");
  let price2 = params.get("price2");
  let size = params.get("size");

  const searchInput = document.getElementById("search-input"); // Set the search input value based on the query parameter
  searchInput.value = searchQuery || ""; // Use empty string if searchQuery is null

  if (searchQuery) {
    var filterData = dataRender.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    dataRender = filterData;
  }

  if ((price1, price2)) {
    var filterData = await dataRender.filter(
      (item) => item.price <= price2 && item.price >= price1
    );
    dataRender = filterData;
  }

  if (category) {
    var filterData = await dataRender.filter(
      (item) => item.category === category
    );
    dataRender = filterData;
  }

  if (size) {
    var filterData = await dataRender.filter((item) => item.size === size);
    dataRender = filterData;
  }

  productList.innerHTML = ""; // Clear the existing product list before rendering

  if (dataRender.length === 0) {
    var listItem = document.createElement("div");
    listItem.className = "col-lg-4 col-md-6 col-sm-6";
    listItem.innerHTML = `<p>There is no corresponding product</p>`;
    productList.appendChild(listItem);
  } else {
    dataRender.forEach((item) => {
      var listItem = document.createElement("div");
      listItem.className = "col-lg-4 col-md-6 col-sm-6";
      listItem.innerHTML = `
            <div class="product__item">
                <div class="product__item__pic">
                    <a href="../Product/productDetail.html?id=${item._id}"><img src= "${item.image}"/></a>
        
                    <ul class="product__hover">  
                        <li>
                            <a href="#"><img src="/img/icon/heart.png" alt=""></a>
                        </li>
        
                        <li>
                            <a href="#"><img src="/img/icon/compare.png" alt=""> <span>Compare</span></a>
                        </li>
        
                        <li>
                            <a href="#"><img src="/img/icon/search.png" alt=""></a>
                        </li>
                    </ul>
                </div>
        
                <div class="product__item__text">
        
                    <h6>${item.name}</h6>
        
                    <a class="add-cart" onclick="addToCart('${item._id}')">+ Add To Cart</a>
        
                    <div class="rating">
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
        
                    <h5>$${item.price}</h5>
        
                    <div class="product__color__select">
                        <label for="pc-4">
                            <input type="radio" id="pc-4">
                        </label>
        
                        <label class="active black" for="pc-5">
                            <input type="radio" id="pc-5">
                        </label>
        
                        <label class="grey" for="pc-6">
                            <input type="radio" id="pc-6">
                        </label>
                    </div>
                </div>
            </div>
            `;
      productList.appendChild(listItem);
    });
  }
};

// ============================== Search ==============================
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const searchInput = document.getElementById("search-input").value;
    url.searchParams.set("search", searchInput);
    const newUrl = `/Customer/Product/productList.html?search=${searchInput}`;

    // Use the History API to update the URL without reloading the page
    history.pushState({ searchInput }, null, newUrl);

    uncheckAllCheckboxes();
    await renderData();
  });

  // Listen to the popstate event to handle back/forward button clicks
  window.addEventListener("popstate", async (event) => {
    // Check if state exists and has searchInput
    if (event.state && event.state.searchInput) {
      const searchInput = event.state.searchInput;
      document.getElementById("search-input").value = searchInput;
      await renderData(); // Update the content based on the new search input
    }
  });

  renderData();
});

// ============================== Handle Checkbox Click ==============================
// Handle Checkbox Click Category
function handleCheckboxClickCategory(checkboxId, category) {
  document
    .querySelectorAll('.category-list input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });

  document.getElementById(checkboxId).checked = true; // Check the clicked checkbox

  filterByCategory(category);
}

// Handle Checkbox Click Price
function handleCheckboxClickPrice(checkboxId) {
  document
    .querySelectorAll('.shop__sidebar__price input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });

  document.getElementById(checkboxId).checked = true; // Check the clicked checkbox

  filterByPrice(price1, price2);
}

// Handle Checkbox Click Size
function handleCheckboxClickCategory(checkboxId, size) {
  document
    .querySelectorAll('.shop__sidebar__size input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });

  document.getElementById(checkboxId).checked = true; // Check the clicked checkbox

  filterBySize(size);
}

// ============================== Uncheck All Checkboxes ==============================
function uncheckAllCheckboxes() {
  document
    .querySelectorAll('.category-list input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });

  document
    .querySelectorAll('.shop__sidebar__price input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });

  document
    .querySelectorAll('.shop__sidebar__size input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
}

// ============================== Clear Filter ==============================
// Clear All Filter
function clearAllFilter() {
  var url = "/Customer/Product/productList.html";
  uncheckAllCheckboxes();
  deleteAllParams();
  // Get the current scroll position
  var startY = window.scrollY;

  // Scroll to the top of the page with animation
  var scrollStep = Math.PI / (1 / 10);
  var cosParameter = startY;
  var scrollCount = 0;

  function step() {
    window.scrollTo(0, cosParameter);
    cosParameter = cosParameter - scrollStep;
    scrollCount++;
    if (cosParameter >= 0) {
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, 0);
      document.body.classList.remove("scroll-up");
    }
  }

  document.body.classList.add("scroll-up"); // Add a class to the body to trigger the slide-up effect
  requestAnimationFrame(step); // Call the animation function
  history.pushState(null, null, url); // Update the URL without triggering a page refresh
  renderData();
}

// Clear Filter Category
function clearFilterCategory() {
  var url = new URL(window.location.href);
  url.searchParams.delete("category");
  document
    .querySelectorAll('.category-list input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
  history.pushState(null, "", url.toString());
  renderData();
}

// Clear Filter Price
function clearFilterPrice() {
  var url = new URL(window.location.href);
  url.searchParams.delete("price1");
  url.searchParams.delete("price2");
  document
    .querySelectorAll('.shop__sidebar__price input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
  history.pushState(null, "", url.toString());
  renderData();
}

// Clear Filter Size
function clearFilterSize() {
  var url = new URL(window.location.href);
  url.searchParams.delete("size");
  document
    .querySelectorAll('.shop__sidebar__size input[type="radio"]')
    .forEach(function (checkbox) {
      checkbox.checked = false;
    });
  history.pushState(null, "", url.toString());
  renderData();
}

// ============================== Delete Params ==============================
function deleteAllParams() {
  url.searchParams.delete("search");
  url.searchParams.delete("category");
  url.searchParams.delete("price1");
  url.searchParams.delete("price2");
  url.searchParams.delete("size");
}

// ==============================  Add To Cart ==============================
// Add to cart
const addToCart = (productId) => {
  function getBearerToken() {
    const userString = localStorage.getItem("user");

    if (userString) {
      const userData = JSON.parse(userString);
      return userData.access_token || null;
    }
    return null;
  }

  const token = getBearerToken();

  if (!token) {
    window.location.href = "/Customer/LoginAndRegister/Login/Login.html";
  }

  fetch("http://localhost:4001/api/carts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      _id: productId,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Product added to cart:", data);
      // You can add any additional logic here, such as updating the UI to reflect the added item.
      showSuccessToast();
    })
    .catch((error) => {
      console.error("Error adding product to cart:", error);
    });
};
// ==============================  Toast ==============================
function showSuccessToast() {
  toast({
    title: "Succces!",
    message: "Added product to cart successfully.",
    type: "success",
    duration: 3000,
  });
}

function toast({ title = "", message = "", type = "", duration }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      error: "fas fa-exclamation-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toaster", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}
