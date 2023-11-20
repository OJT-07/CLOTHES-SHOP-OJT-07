function getBearerToken() {
    const userString = localStorage.getItem('user');

    if (userString) {
        const userData = JSON.parse(userString);
        return userData.access_token || null;
    }
    return null;
}

function addActionButtons(row, product, count) {
    const editButton = createButton('Edit', 'btn-warning');
    const deleteButton = createButton('Delete', 'btn-danger');

    deleteButton.onclick = function () {
        showPopup();
        // const productId = row.querySelector('td:nth-child(1)').textContent;
        document.getElementById('confirmDelete').onclick = function () {
            deleteItem(product._id, count);
            closePopup();
        };
    };
    editButton.onclick = function () {
        window.location.href = `./Update.html?id=${product._id}`;
        
    }

    row.querySelector('td:nth-child(10)').append(editButton, deleteButton);
}


function createButton(text, className) {
    const button = document.createElement('button');
    button.className = `btn ${className} btn-sm`;
    button.innerText = text;
    return button;
}

async function fetchData() {
    try {
        const token = getBearerToken();
        const response = await fetch('http://localhost:4001/api/products', {
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

        if (!data || !Array.isArray(data.products)) {
            return;
        }

        container.innerHTML = '';

        const reversedProducts = data.products.slice().reverse();

        reversedProducts.forEach((product, index) => {
            let count = index + 1;
            const row = document.createElement('tr');
            row.setAttribute("id", "product" + count)
            const fullDescription = product.description;

            row.innerHTML = `
                <td>${count}</td>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td class="description" data-full-description="${fullDescription}">
                    <div class="description-content">${truncateDescription(fullDescription)}</div>
                    <span class="read-more" onclick="toggleDescription(this)">Read more</span>
                </td>
                <td>${product.subDescription}</td>
                <td>${product.size.map((size) => `<div style="background-color: #5a9aaa; color: white; margin: 2px 0;">${size}</div>`).join('')}</td>
                <td style="">${product.color.map((color) => `<div style="width: 30px; height: 30px; border-radius: 50%; overflow: hidden;  border: 0.1px solid #000; margin: 3px 0; background-color: ${color}; "></div>`).join('')}</td>
                <td><img id="productImage" src="${product.image}" alt="Product Image"></td>
                <td></td>
                <td></td>
            `;

            addActionButtons(row, product, count);
            container.appendChild(row);
            // console.log(row);
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

// function updateTable(count) {
//     const deletedRow = document.getElementById(`product${count}`);
//     deletedRow.remove();
// }


renderData();   

