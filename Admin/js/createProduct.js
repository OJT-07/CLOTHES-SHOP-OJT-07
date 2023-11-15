function updateImageValue(inputElement) {
    var imageUrl = inputElement.value;
    var holder = document.getElementById('holder');
    holder.innerHTML = '<img src="' + imageUrl + '" style="max-height:100px;">';
}

function chooseImage() {
    var choice = prompt("Chọn 1 để nhập đường dẫn hình ảnh, chọn 2 để chọn tệp tin");
    if (choice === '1') {
        var imageUrl = prompt("Nhập đường dẫn hình ảnh hoặc link"); 
        if (imageUrl !== null && imageUrl !== "") {
            document.getElementById('imageUrl').value = imageUrl;
            var holder = document.getElementById('holder');
            holder.innerHTML = '<img src="' + imageUrl + '" style="max-height:100px;">';
        }
    } else if (choice === '2') {
        document.getElementById('imageFile').click();
    }
}

function updateImageFileValue(inputElement) {
    var file = inputElement.files[0];
    var reader = new FileReader();

    reader.onload = function() {
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

document.getElementById('colorPicker').addEventListener('input', function(event) {
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
document.getElementById('removeLastColorButton').addEventListener('click', function() {
    selectedColors.pop();
    updateColorInput();
});

document.getElementById('removeAllColorButton').addEventListener('click', function() {
    selectedColors = [];
    updateColorInput();
});



function createProduct() {
    var nameProduct = document.querySelector('input[name="nameProduct"]').value;
    var nameCategory = document.querySelector('input[name="nameCategory"]').value;
    var price = document.querySelector('input[name="price"]').value;
    var description = document.querySelector('textarea[name="description"]').value;
    var subDescription = document.querySelector('textarea[name="sub_description"]').value;
    var quantity = document.querySelector('input[name="quantity"]').value;
    var image = document.getElementById('imageUrl').value;
    var size = document.getElementById('output-input').value;

    var productData = {
        name: nameProduct,
        category: nameCategory,
        price: price,
        description: description,
        subDescription: subDescription,
        quantity: quantity,
        color: selectedColors,
        size: size,
        image: image
    };

    console.log(productData);

    fetch('http://localhost:4001/api/products', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

