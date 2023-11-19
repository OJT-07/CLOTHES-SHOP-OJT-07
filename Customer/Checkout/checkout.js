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
        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function renderData() {
    try {
        const cartItemsElement = document.querySelector('#PriceProduct');
        const data = await fetchData();
        console.log('Data', data);

        cartItemsElement.innerHTML = '';

        let totalPrice = 0;
        data.allCartItem.forEach((cartItem, index) => {
            const li = document.createElement('li');
            li.innerHTML = `${index + 1}. ${cartItem.productId.name} <span>$ ${cartItem.cart_item_price.toFixed(1)}</span>`;
            cartItemsElement.appendChild(li);

            totalPrice += cartItem.cart_item_price;
        });

        document.getElementById("TotalPrice").innerHTML = "$ " + totalPrice.toFixed(2);


    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}

renderData()

document.addEventListener("DOMContentLoaded", async () => {
    const token = getBearerToken();
    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    try {
        const response = await fetch('http://localhost:4001/api/auth/get_me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const userData = await response.json();

        name.value = userData?.user?.name;
        address.value = userData?.user?.address;
        phone.value = userData?.user?.phone;
        email.value = userData?.user?.email;


    } catch (error) {
        console.error('Error:', error);
    }

    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", async (event) => {
        // Your form submission logic remains here
    });
});

async function hidePreloaderAfterRendering() {
    try {
        const token = getBearerToken();
        await fetch("http://localhost:4001/api/carts", {
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


