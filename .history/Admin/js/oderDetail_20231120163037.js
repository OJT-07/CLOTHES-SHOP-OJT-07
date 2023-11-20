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
        const response = await fetch(`http://localhost:4001/api/orders/655af8ba1ae605a333ed23b9`, {
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
        const data = await fetchData();
        console.log('Data', data);


        let totalPrice = 0;
        
        // for (const cartItem in data.cart_items) {
        //     // console.log(`Order ID: ${order._id}, Cart Item ID: ${cartItem._id}, Cart Item Price: ${cartItem.cart_item_price}`);
        //     totalPrice += cartItem.cart_item_price;
        // }
        
        const array = data.order;

        console.log(array);

        for(let i = 0; i < array.cart_items.length ; i++) {
            totalPrice += array.cart_items[i].cart_item_price;
        }

        const time = data.order.createdAt;

        console.log(totalPrice);

        document.getElementById("TotalPrice1").innerHTML = "$" +totalPrice.toFixed(2);
        document.getElementById("TotalPrice2").innerHTML = "$" +totalPrice.toFixed(2);
        document.getElementById("timeCreate").innerHTML = formattedDate;

    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}

renderData();