function updateImageValue() {
    var imageUrl = document.getElementById('imageUrl').value;
    var holder = document.getElementById('holder');
    holder.innerHTML = '<img src="' + imageUrl + '" style="max-height:100px;">';
}

function chooseImage() {
    document.getElementById('imageFile').click();
}

function updateImageFileValue(inputElement) {
    var file = inputElement.files[0];
    var reader = new FileReader();

    reader.onload = function () {
        var imageUrl = reader.result;
        var holder = document.getElementById('holder');
        holder.innerHTML = '<img src="' + imageUrl + '" style="max-height:100px;">';
        document.getElementById('imageUrl').value = imageUrl;
    }

    reader.readAsDataURL(file);
}

function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    var checkboxId = event.dataTransfer.getData("text");
    var draggedCheckbox = document.getElementById(checkboxId);

    if (event.target.classList.contains('droppable')) {
        event.target.appendChild(draggedCheckbox);
    } else if (event.target.classList.contains('draggable')) {

        event.target.parentNode.appendChild(draggedCheckbox);
    }

    updateInput();
}

function updateInput() {
    var checkboxes = document.querySelectorAll('.draggable-item');
    var checkedValues = [];

    checkboxes.forEach(function (checkbox) {
        if (checkbox.checked) {
            var label = checkbox.nextElementSibling;
            checkedValues.push(label.textContent.trim());
        }
    });

    document.getElementById('output-input').value = checkedValues.join(', ');
}

var selectedColors = [];

document.getElementById('colorPicker').addEventListener('input', function (event) {
    var selectedColor = event.target.value;
    selectedColors.push(selectedColor);
    console.log(selectedColors);

    updateColorInput();
});

function updateColorInput() {
    // Retrieve the existing color codes
    var colorCodesElement = document.getElementById('colorInput');
    // Display the selected color codes
    colorCodesElement.value = selectedColors.join(', ');
}

// Example: Adding a button to remove the last color
document.getElementById('removeLastColorButton').addEventListener('click', function () {
    selectedColors.pop();
    updateColorInput();
});

document.getElementById('removeAllColorButton').addEventListener('click', function () {
    selectedColors = [];
    updateColorInput();
});

function getBearerToken() {
    const userString = localStorage.getItem('user');

    if (userString) {
        const userData = JSON.parse(userString);
        return userData.access_token || null;
    }
    return null;
}


function createProduct() {
    var nameProduct = document.querySelector('input[name="nameProduct"]').value;
    var categorySelect = document.querySelector('select[name="nameCategory"]');
    var selectedCategoryValue = categorySelect.value;
    var selectedCategoryText = categorySelect.options[categorySelect.selectedIndex].text;
    var price = document.querySelector('input[name="price"]').value;
    var description = document.querySelector('textarea[name="description"]').value;
    var subDescription = document.querySelector('textarea[name="sub_description"]').value;
    var quantity = document.querySelector('input[name="quantity"]').value;
    var image = document.getElementById('imageUrl').value;
    var size = document.getElementById('output-input').value;

    var categoryMap = {
        "0": "T-shirt",
        "1": "Shirt",
        "2": "Bags",
        "3": "Pants",
        "4": "Jacket",
        "5": "Other"
    };

    var productData = {
        name: nameProduct,
        category: categoryMap[selectedCategoryValue],
        price: price,
        description: description,
        subDescription: subDescription,
        quantity: quantity,
        color: selectedColors,
        size: size,
        image: image
    };

    console.log(productData);

    const token = getBearerToken();

    fetch('https://web-api-5vrh.onrender.com/api/products', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Success:', data);
            // Redirect to adminPage.html only when the POST request is successful
            window.location.href = './adminPage.html';
        })
        .catch(error => {
            console.error('Error:', error);
        });

}

