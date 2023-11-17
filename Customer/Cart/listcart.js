const userId = "654daad881aeef03266a6de4";

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
        const response = await fetch('http://localhost:4001/api/carts', {
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

        await renderData();
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
        const data = await fetchData();
        console.log('Data', data);

        const cartItemsElement = document.querySelector('#cart-items');
        const quantityUpdate = document.querySelector('#quantityUpdate');

        //    console.log(quantityUpdate);

        let totalPrice = 0;
        data.allCartItem.forEach((cartItem) => {
            const Item = document.createElement("tr");
            Item.setAttribute("id", `${cartItem._id}`)
            totalPrice += cartItem.cart_item_price;
            // Create a button element and attach an event listener
            const deleteButton = document.createElement("button");
            deleteButton.innerHTML = '<i class="fa fa-close"></i>';
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
                        <div class="pro-qty-2">
                            <p> ${cartItem.size}</p>
                        </div>
                    </div>
                </td>
                <td class="quantity__item">
                    <div class="quantity">
                        <div class="pro-qty-2">
                            <p id="colorProduct"> ${cartItem.color}</p>
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
            // Append the button to the last cell
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

        // Access the price from the productId object
        const price = responseItem.cart_item.productId.price;

        console.log('Product Price:', price);


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

            const data = await response.json();
            // console.log('Success:', data);

            await renderData();
            updateTotalPrice();
        }

    } catch (error) {
        console.error('Error updating quantity:', error);
    }
    // console.log(_id + "  "+ newQuantity);
}

document.addEventListener('input', function (event) {

    if (event.target && event.target.id === 'quantityUpdate') {
        const _id = event.target.closest('tr').id;

        const newQuantity = parseInt(event.target.value, 10);

        updateQuantityAndPrice(_id, newQuantity);
    }
});

async function updateTotalPrice() {
    try {
        const data = await fetchData();

        data.allCartItem.forEach((cartItem) => {
            const cartItemElement = document.getElementById(cartItem._id);
            const cartPriceElement = cartItemElement.querySelector('.cart__price');

            const updatedProductPrice = cartItem.productId.price * cartItem.quantity;
            cartPriceElement.innerHTML = "$ " + updatedProductPrice.toFixed(2);
        });

        let totalPrice = 0;
        data.allCartItem.forEach((cartItem) => {
            totalPrice += cartItem.cart_item_price;
        });

        const TotalCheckout = document.getElementById("TotalPrice");
        TotalCheckout.innerHTML = "$ " + totalPrice.toFixed(2);

    } catch (error) {
        console.error('Error updating total price:', error);
    }
}

renderData();




