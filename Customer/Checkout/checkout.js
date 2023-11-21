function getBearerToken() {
    const userString = localStorage.getItem('user');
    if (userString) {
        const userData = JSON.parse(userString);
        return userData.access_token || null;
    }
    return null;
}

let cartItemIds = [];

async function fetchData() {
    try {
        const token = getBearerToken();
        const response = await fetch('https://web-api-5vrh.onrender.com/api/carts', {
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

            cartItemIds.push(cartItem._id);

            const li = document.createElement('li');
            li.innerHTML = `${index + 1}. ${cartItem.productId.name} <span>$ ${cartItem.cart_item_price.toFixed(1)}</span>`;
            cartItemsElement.appendChild(li);

            totalPrice += cartItem.cart_item_price;
        });

        console.log(cartItemIds);

        document.getElementById("TotalPrice").innerHTML = "$ " + totalPrice.toFixed(2);


    } catch (error) {
        console.error('Error fetching or rendering data:', error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const token = getBearerToken();
    const name = document.getElementById("name");
    const address = document.getElementById("address");
    const phone = document.getElementById("phone");
    const email = document.getElementById("email");
    try {
        const response = await fetch('https://web-api-5vrh.onrender.com/api/auth/get_me', {
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

(() => {
    const preloaderPromise = new Promise((resolve, reject) => {
        const preloader = document.getElementById("preloder");
        if (preloader) {
            resolve(preloader);
        } else {
            reject(new Error("Preloader not found"));
        }
    });

    preloaderPromise
        .then((preloader) => {
            return renderData().then(() => preloader);
        })
        .then((preloader) => {
            preloader.style.display = "none";
        })
        .catch((error) => {
            console.error('Error:', error);
        });
})();



function showAlert() {
    Swal.fire({
      title: 'Male Fashion',
      text: 'Do you want to confirm your order',
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      // Check if the user clicked the "OK" button
      if (result.isConfirmed) {
        PostOther()
      }
    });
  }
function PostOther() {
    const token = getBearerToken();
    const url = `https://web-api-5vrh.onrender.com/api/orders`;

    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({cartItemIds }),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    })
    .then(data => {
        console.log('Order created successfully:', data);

        window.location.href = "/Customer/Checkout/viewthanks.html";
    })
    .catch(error => {
        console.error('Error creat order:', error);
    });
}

const submitOrderButton = document.querySelector('#postOther');

submitOrderButton.addEventListener('click', function (event) {
    event.preventDefault();

    PostOther();
});




