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
        const response = await fetch('http://localhost:4001/api/orders', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function renderData() {
    try {
        const container = document.querySelector('#bodyTable');
        const data = await fetchData();
        console.log('Data', data);

        if (!data || !Array.isArray(data.orders)) {
            return;
        }

        
        
        // let total = 0;
        // data.orders.forEach((item) => {
        //     total += item.cart_item_price;
        // });
        const cartItemPrices = data.orders[0].cart_items.map(item => item.cart_item_price);
        console.log(cartItemPrices);

        container.innerHTML = '';

        const reversedProducts = data.orders.slice().reverse();

        reversedProducts.forEach((order) => {
            const row = document.createElement('tr');

            row.innerHTML = `
                <td>${order.code}</td>
                <td>${order.userId.name}</td>
                <td>${order.userId.address}</td>
                <td>${total}</td>
                
                <td></td>
            `;
            container.appendChild(row);
        });

    } catch (error) {
        console.error('Error rendering data:', error);
    }
}

function truncateDescription(description, maxLength = 75) {
    const truncatedText = description.length > maxLength ? description.substring(0, maxLength) + '...' : description;
    return truncatedText;
}



function toggleDescription(element) {
    const descriptionElement = element.parentNode;
    const expanded = descriptionElement.classList.toggle('expanded');
    const fullDescription = descriptionElement.dataset.fullDescription;

    const contentElement = descriptionElement.querySelector('.description-content');

    if (expanded) {
        contentElement.innerHTML = fullDescription;
        element.innerText = 'Read less';
    } else {
        const truncatedText = truncateDescription(fullDescription);
        contentElement.innerHTML = truncatedText;
        element.innerText = 'Read more';
    }
}

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


function showPopup() {
    document.getElementById('deletePopup').style.display = 'flex';
}

function closePopup() {
    document.getElementById('deletePopup').style.display = 'none';
}

async function deleteItem(_id, count) {
    try {
        const token = getBearerToken();
        const response = await fetch(`http://localhost:4001/api/products/${_id}`, {
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

        // Sau khi xóa thành công, load lại toàn bộ dữ liệu và render lại bảng
        await renderData();
        closePopup();
    } catch (error) {
        console.error('Error:', error);
    }
}


renderData();   

