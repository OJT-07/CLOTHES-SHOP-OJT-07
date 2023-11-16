const userId = "654daad881aeef03266a6de4";



async function fetchData() {
    try {
        const response = await fetch(`http://localhost:4001/api/carts/${userId}`);
        const data = await response.json();
     
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}


async function deleteItem(_id) {
    console.log("🚀 ~ file: listcart.js:55 ~ deleteItem ~ _id:", _id)
    try {
        const response = await fetch(`http://localhost:4001/api/cart-item/${_id}`, {
            method: 'DELETE',
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
        
           console.log(quantityUpdate);
           
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
                <td class="cart__price">$ ${cartItem.cart_item_price}.00</td>
                <td class="cart__close"></td>

            `;
            // Append the button to the last cell
            Item.querySelector('.cart__close').appendChild(deleteButton);

            cartItemsElement.appendChild(Item);
            
            console.log(Item);
        });
        
        console.log(totalPrice);

        const TotalCheckout = document.getElementById("TotalPrice").innerHTML = "$ " + totalPrice + ".00";

        } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}




renderData();




