const API_ENDPOINT = "http://localhost:4001/api/carts"

function getBearerToken() {
    const userString = localStorage.getItem('user');

    if (userString) {
        const userData = JSON.parse(userString);
        return userData.access_token || null;
    }
    return null;
}


async function fetchData() {
    try {
        const token = getBearerToken();
        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        // console.log("🚀 ~ file: listcart.js:9 ~ fetchData ~ response:", response);
        return data;
        // console.log('Access Token:', token);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function deleteItem(_id) {
    console.log("🚀 ~ file: listcart.js:55 ~ deleteItem ~ _id:", _id)
    try {
        const token = getBearerToken();
        const response = await fetch(`http://localhost:4001/api/cart-item/${_id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log('Success:', data);
        updateTable(_id)
        updateTotalPrice();

        // await renderData();
    } catch (error) {
        console.error('Error:', error);
    }
}

function updateTable(productId) {
    const deletedRow = document.getElementById(productId)
    deletedRow.remove();
}

async function renderData() {
    try {
        const cartItemsElement = document.querySelector('#cart-items');
        const data = await fetchData();
        console.log('Data', data);

        if (!data || !Array.isArray(data.allCartItem)) {
            return;
        }

        //    console.log(quantityUpdate);

        let totalPrice = 0;
        data.allCartItem.forEach((cartItem) => {
            const Item = document.createElement("tr");
            Item.setAttribute("id", `${cartItem._id}`)
            
            totalPrice += cartItem.cart_item_price;


            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fa fa-close"></i>';

            deleteButton.style.border = 'none'; 
            deleteButton.style.background = 'none'; 
            deleteButton.style.padding = '0'; 
            deleteButton.style.cursor = 'pointer'; 
            deleteButton.style.outline = 'none'; 
            deleteButton.addEventListener('click', () => deleteItem(cartItem._id));

            

            Item.innerHTML = `
                <td class="product__cart__item">
                    <div class="product__cart__item__pic">
                        <img src="${cartItem.productId.image}" alt="imageProduct" style="max-width: 150px;">
                    </div>
                    <div class="product__cart__item__text">
                        <h6>${cartItem.productId.name}</h6>
                        <h5>$ ${cartItem.productId.price}.00</h5>
                    </div>
                </td>
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2" id="updateSize">
                            <select class="form-control" id="colorDropdown">
                                ${cartItem.productId.size.map((size) => `<option value="${size}" ${size === cartItem.size ? 'selected' : ''}>${size}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                </td>

                <td class="quantity__item">
                    <div class="quantity" id="sizeDropdownContainer">
                        <div class="pro-qty-2" style="display: flex; align-items: center; width: 100%;">
                            <select style="background-color: ${cartItem.color}" class="form-control" id="sizeDropdown">
                                ${cartItem.productId.color.map((color) => `
                                    <option value="${color}" style="background-color: ${color};" ${color === cartItem.color ? 'selected' : ''}></option>
                                `).join('')}
                            </select>
                        </div>
                    </div>
                </td>

                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2">
                            <input type="number" id="quantityUpdate" value="${cartItem.quantity}">
                        </div>
                    </div>
                </td>
                <td class="cart__price" id="cartPrice">$ ${cartItem.cart_item_price}.00</td>
                <td class="cart__close"></td>

            `;

            Item.querySelector('.cart__close').appendChild(deleteButton);

            cartItemsElement.appendChild(Item);

            // console.log(Item);
        });

        // console.log(totalPrice);

        const TotalCheckout = document.getElementById("TotalPrice").innerHTML = "$ " + totalPrice + ".00";

    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}

async function hidePreloaderAfterRendering() {
    try {
        const token = getBearerToken();
        const response = await fetch(API_ENDPOINT, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const preloader = document.getElementById("preloder");
        if (preloader) {
            preloader.style.display = "none";
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

window.addEventListener("DOMContentLoaded", (event) => {
    hidePreloaderAfterRendering();
});



document.addEventListener('input', function (event) {
    if (event.target && event.target.id === 'quantityUpdate') {
        const _id = event.target.closest('tr').id;
        const newQuantity = parseInt(event.target.value, 10);
        updateQuantityAndPrice(_id, newQuantity);
    } else if (event.target && (event.target.id === 'colorDropdown' || event.target.id === 'sizeDropdown')) {
        const _id = event.target.closest('tr').id;
        const value = event.target.value;

        if (event.target.id === 'colorDropdown') {
            updateCartItemSize(_id, value);
        } else if (event.target.id === 'sizeDropdown') {
            updateCartItemColor(_id, value);
        }
    }
});


async function updateQuantityAndPrice(_id, newQuantity) {
    try {
        const token = getBearerToken();

        const getCartItemById = await fetch(`http://localhost:4001/api/cart-item/${_id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const responseItem = await getCartItemById.json();

        const price = responseItem.cart_item.productId.price;

        // console.log('Product Price:', price);


        if (getCartItemById) {
            const response = await fetch(`http://localhost:4001/api/cart-item/${_id}`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: newQuantity, cart_item_price: price * newQuantity }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            // console.log('Success:', data);
            updateTotalPrice();
            await renderData();
        }

    } catch (error) {
        console.error('Error updating quantity:', error);
    }
    // console.log(_id + "  "+ newQuantity);
}

async function updateTotalPrice() {
    try {
        const data = await fetchData();

        let totalPrice = 0;

        data.allCartItem.forEach((cartItem) => {

            const cartItemElement = document.getElementById(cartItem._id);
            const cartPriceElement = cartItemElement.querySelector('#cartPrice');

            const updatedProductPrice = cartItem.productId.price * cartItem.quantity;
            cartPriceElement.innerHTML = "$ " + updatedProductPrice.toFixed(2);

            totalPrice += cartItem.cart_item_price;
            const TotalCheckout = document.getElementById("TotalPrice");
            TotalCheckout.innerHTML = "$ " + totalPrice.toFixed(2);
        });
    } catch (error) {
        console.error('Error updating total price:', error);
    }
}

function updateCartItemSize(itemId, newSizeIndex) {
    const token = getBearerToken();
    const url = `http://localhost:4001/api/cart-item/${itemId}`;
    const data = {
        size: newSizeIndex,
    };

    fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log('Size updated successfully:', data);
    })
    .catch(error => {
        console.error('Error updating size:', error);
    });
}

async function updateCartItemColor(itemId, newColorIndex) {
    try {
        const token = getBearerToken();
        const url = `http://localhost:4001/api/cart-item/${itemId}`;
        const data = {
            color: newColorIndex,
        };

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const updatedData = await response.json();
        console.log('Color updated successfully:', updatedData);
        updateCorlorItem();

        // await renderData();

    } catch (error) {
        console.error('Error updating color:', error);
    }
}

async function updateCorlorItem() {
    try {
        const data = await fetchData();

        data.allCartItem.forEach((cartItem) => {
            const cartItemElement = document.getElementById(cartItem._id);

            const colorSelect  = cartItemElement.querySelector('#sizeDropdown');  
            colorSelect.style.backgroundColor = cartItem.color;
        });
    } catch (error) {
        console.error('', error);
    }
}


renderData();