function getBearerToken() {
    const userString = localStorage.getItem('user');
    if (userString) {
        const userData = JSON.parse(userString);
        return userData.access_token || null;
    }
    return null;
}


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


        const responseCartsItem = await fetch('http://localhost:4001/api/carts', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        console.log("🚀 ~ file: checkout.js:35 ~ document.addEventListener ~ responseCartsItem:", responseCartsItem)

        if (!response.ok) {
            throw new Error('Unable to fetch user data');
        }

        if(!responseCartsItem.ok){
            throw new Error('Unable to fetch cart items');
        }


        const userData = await response.json();

        const cartItems = await responseCartsItem.json();
        // Populate form fields with fetched data
        name.value = userData?.user?.name;
        address.value = userData?.user?.address;
        phone.value = userData?.user?.phone;
        email.value = userData?.user?.email;
        // Populate other fields as needed

        let total = 0
        cartItems.allCartItem.forEach((item)=>{
            total += item.cart_item_price;
            
        })
        console.log(total);
        const cartTotal = document.getElementById("total");
        cartTotal.innerHTML = "$ " + total.toFixed(2);


    } catch (error) {
        console.error('Error:', error);
    }

    const form = document.getElementById("checkoutForm");
    form.addEventListener("submit", async (event) => {
        // Your form submission logic remains here
    });
});

