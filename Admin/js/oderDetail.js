function getBearerToken() {
  const userString = localStorage.getItem("user");
  if (userString) {
    const userData = JSON.parse(userString);
    return userData.access_token || null;
  }
  return null;
}

async function fetchData() {
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
    const token = getBearerToken();
    const response = await fetch(
      `http://localhost:4001/api/orders/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function renderData() {
  try {
    const data = await fetchData();
    console.log("Data", data);

    let totalPrice = 0;

    for (const cartItem in data.cart_items) {
      // console.log(`Order ID: ${order._id}, Cart Item ID: ${cartItem._id}, Cart Item Price: ${cartItem.cart_item_price}`);
      totalPrice += cartItem.cart_item_price;
    }

    const array = data.data;

    for (let i = 0; i < array.cart_items.length; i++) {
      totalPrice += array.cart_items[i].cart_item_price;


    }

    const time = data.data.createdAt;
    const dateObject = new Date(time);
    const formattedDate = `${dateObject.getFullYear()}-${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    const code = data.data.code;

    const tableBody = document.getElementById("productTeam");

    data.data.cart_items.forEach((productDetail, index) => {
      const tr = document.createElement('tr');
      const uniqueId = `name_${index}`; // Generate a unique ID
      tr.innerHTML = `
        <td>
          <div class="d-flex mb-2">
            <div class="flex-shrink-0">
              <img src="${productDetail.productId.image}" alt="" width="35" class="img-fluid">
            </div>
            <div class="flex-lg-grow-1 ms-3">
              <h6 class="small mb-0"><a href="#" id="${uniqueId}" class="text-reset">${productDetail.productId.name}</a></h6>
              <span class="small">Color: ${productDetail.color}</span>
            </div>
          </div>
        </td>
        <td>${productDetail.quantity}</td>
        <td class="text-end">$${productDetail.cart_item_price}.00</td>
      `;
    
      tableBody.appendChild(tr);
    });
    
    const address = data.data.userId.address;
    const phone = data.data.userId.phone;
    const name = data.data.userId.name;


    document.getElementById("TotalPrice1").innerHTML =
      "$" + totalPrice.toFixed(2);
    document.getElementById("TotalPrice2").innerHTML =
      "$" + totalPrice.toFixed(2);
      document.getElementById("TotalPrice3").innerHTML =
      "$" + totalPrice.toFixed(2);

    document.getElementById("timeCreate").innerHTML = formattedDate;
    document.getElementById("code").innerHTML = "#" + code;
    document.getElementById("address").innerHTML = address;
    document.getElementById("address1").innerHTML = address;
    document.getElementById("phone").innerHTML = "Phone: " + phone;
    document.getElementById("phone1").innerHTML = "Phone: " + phone;
    document.getElementById("name").innerHTML = name;
    document.getElementById("name1").innerHTML = name;
    document.getElementById("FedEx").innerHTML = "FF" + code;

  } catch (error) {
    console.error("Error fetching or rendering data:", error);
  }
}

renderData();

async function hidePreloaderAfterRendering() {
  try {
      await renderData(); 
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

