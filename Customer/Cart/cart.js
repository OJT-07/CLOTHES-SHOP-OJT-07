document.getElementById("cart-items").addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-item")) {
    // Handle Remove button click
    const productId = event.target.getAttribute("data-product-id");
    removeFromCart(productId);
  } else if (event.target.classList.contains("update-quantity")) {
    // Handle Update button click
    const productId = event.target.getAttribute("data-product-id");
    const newQuantity = parseInt(
      document.getElementById(`quantity-${productId}`).value
    );
    updateCartItemQuantity(productId, newQuantity);
  }
});

function handleRouting() {
  const path = window.location.pathname;
  const slug = path.replace("/", "");
  if (slug === "cart") {
    loadCartPage();
  } else {
    loadPage(slug || "home");
  }
}
// Xóa sản phẩm khỏi giỏ hàng
function removeFromCart(productId) {

  fetch(`/api/cart/${productId}`, {
    method: 'DELETE'
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message); // Thông báo xóa thành công

      // Load lại danh sách giỏ hàng
      loadCartItems();
    })
    .catch(err => {
      console.error('Error deleting product', err);
    });

}
// Cập nhật số lượng sản phẩm
function updateCartItemQuantity(productId, newQuantity) {
  if (newQuantity < 1) {
    console.error('Số lượng sản phẩm không thể bé hơn 1');
    return; // Không thực hiện cập nhật nếu giá trị là âm
  }
  fetch(`/api/cart/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ quantity: newQuantity })
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);

      // Load lại danh sách giỏ hàng
      loadCartItems();
    })
    .catch(err => {
      console.error('Error updating quantity', err);
    })

}
function incrementQuantity(input) {
  var quantityInput = input.parentElement.querySelector("input");
  var value = parseInt(quantityInput.value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  quantityInput.value = value;
  updateTotalPrice();
}

function decrementQuantity(input) {
  var quantityInput = input.parentElement.querySelector("input");
  var value = parseInt(quantityInput.value, 10);
  if (value > 1) {
    value = isNaN(value) ? 0 : value;
    value--;
    quantityInput.value = value;
    updateTotalPrice();
  }
}

function updateQuantity(input) {
  var value = parseInt(input.value, 10);
  if (value < 1 || isNaN(value)) {
    input.value = 1;
  }
  updateTotalPrice();
}

function updateTotalPrice() {
  var totalPrice = 0;
  var cartItems = document.querySelectorAll(".product-quantity");
  cartItems.forEach((cartItem) => {
    var quantity = parseInt(cartItem.querySelector("input").value, 10);
    var price = parseFloat(cartItem.dataset.price);
    totalPrice += quantity * price;
  });

  // Cập nhật tổng giá trên giao diện
  document.getElementById("total-price").textContent = "$" + totalPrice.toFixed(2);
}
updateTotalPrice();


function loadCartItems() {
  fetch(`/api/carts`)
    .then((response) => response.json())
    .then((cartItems) => {
      const cartItemsElement = document.getElementById("cart-items");
      let totalQuantity = 0;
      let totalPrice = 0;
      if (!cartItemsElement) {
        console.error("Element with id 'cart-items' not found.");
        return;
      }
      
      if (cartItems.length === 0) {
        cartItemsElement.innerHTML = `<div class="oopss">
                    <div class="title">OOPSS...</div> 
                    <div class="message">
                        Giỏ hàng hiện đang trống <br >
                        Không có sản phẩm nào trong<br >
                        giỏ của bạn
                    </div> 
                    <div class="button button-dark button-small mt-6 nuxt-link-exact-active nuxt-link-active">
                        Tiếp tục mua sắm
                    </div>
                </div>
            </div>`;
      } else {
        //   <td class="product-name">
        //   <img src="${item.image}" alt="${item.name}" class="product-image">
        //   ${item.name}
        // </td>
        cartItemsElement.innerHTML = "";
        cartItems.forEach((item) => {
          const row = document.createElement("tr");
          
          row.innerHTML = `

                <td class="product__cart__item">
                <div class="product__cart__item__pic">
                    <img src="${item.image}" alt="Product Image" class="product-image">         
                </div>

                <div class="product__cart__item__text">
                    <h6>${item.name}</h6>
                    <h5>$ ${item.price}.00</h5>
                </div>
                </td>
                <td class="quantity__item">
                <div class="quantity">
                    <div class="pro-qty-2">
                        <input type="text" value="${item.quantity}">
                    </div>
                </div>
                </td>
               
                <td class="cart__price">${item.price * item.quantity}</td>
              `;

          cartItemsElement.appendChild(row);

          totalQuantity += item.quantity;
          totalPrice += item.price * item.quantity;
          
        });

        const updateButtons = cartItemsElement.querySelectorAll(".update-quantity");
        const removeButtons = cartItemsElement.querySelectorAll(".remove-item");

        updateButtons.forEach((button) => {
          button.addEventListener("click", handleUpdateButtonClick);
        });

        removeButtons.forEach((button) => {
          button.addEventListener("click", handleRemoveButtonClick);
        });
      }

      document.getElementById("total-quantity").textContent = totalQuantity;
      document.getElementById("total-price").textContent = totalPrice;
    })
    .catch(() => {
      const cartItemsElement = document.getElementById("cart-items");
      if (cartItemsElement) {
        cartItemsElement.innerHTML = `
                <div class="message">
                    <div class="title">OOPSS...</div> 
                    <div class="message">
                        Giỏ hàng hiện đang trống <br >
                        Không có sản phẩm nào trong<br >
                        giỏ của bạn
                    </div> 
                    <div class="button button-dark button-small mt-6 nuxt-link-exact-active nuxt-link-active">
                        Tiếp tục mua sắm
                    </div>
                </div>
            </div>`;
      }
    });
}
function redirectToProducts() {
  window.location.href = "/product";
}

function handleAddToCartClick() {
  const productId = segments[segments.length - 1];
  const productName = document.getElementById("product-name").textContent;
  const productPrice = parseFloat(document.getElementById("product-price").textContent);
  const productQuantity = parseInt(document.getElementById("quantity").textContent, 10);
  addProductToCart(productId, productName, productPrice, productQuantity);
}

function handleUpdateButtonClick(event) {
  const productId = event.target.getAttribute("data-product-id");
  const newQuantity = parseInt(
    document.getElementById(`quantity-${productId}`).value
  );
  updateCartItemQuantity(productId, newQuantity);
}

function handleRemoveButtonClick(event) {
  const productId = event.target.getAttribute("data-product-id");
  removeFromCart(productId);
}

loadCartItems();

// document.getElementById("open-cart-button").addEventListener("click", () => {
//   document.querySelector(".card").classList.add("active");
// });
// document.getElementById("close-cart-button").addEventListener("click", () => {
//   document.querySelector(".card").classList.remove("active");
// });

document.getElementById("open-cart-button").addEventListener("click", function () {
  var cardPopup = document.querySelector(".card");
  if (cardPopup) {
    cardPopup.classList.add("active");
  }
});

// Lắng nghe sự kiện click vào nút đóng giỏ hàng trong popup
document.getElementById("close-cart-button").addEventListener("click", function () {
  var cardPopup = document.querySelector(".card");
  if (cardPopup) {
    cardPopup.classList.remove("active");
  }
});

loadCartItems();
