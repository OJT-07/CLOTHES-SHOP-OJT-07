const filterProducts = (category) => {
    window.location.assign(`/Customer/Product/productList.html?category=${category}`);
}

const renderData = async () => {
    const response = await fetch("https://web-api-5vrh.onrender.com/api/products");
    const data = await response.json();
    const productList = document.getElementById("product-list");
    let dataRender;
    let params = new URL(document.location).searchParams;
    let category = params.get("category");

    if (category === null || category === 'All') {
        dataRender = data.products;
    } else {
        var filterData = await data.products.filter(
            (item) => item.category === category
        );
        dataRender = filterData;
    }

    if (dataRender.length === 0) {
        var listItem = document.createElement("div");
        listItem.className = "col-lg-4 col-md-6 col-sm-6";
        listItem.innerHTML = `<p>There is no corresponding product</p>`;
        productList.appendChild(listItem);
    } else {
        dataRender.forEach((item) => {
            var listItem = document.createElement("div");
            listItem.className = "col-lg-4 col-md-6 col-sm-6";
            listItem.innerHTML = `
            <!-- Your existing product HTML here -->
            `;
            productList.appendChild(listItem);
        });
    }
};

// Function to filter products based on search input
const filterBySearch = () => {
    const searchInput = document.getElementById("searchInput");
    const searchTerm = searchInput.value.toLowerCase();

    // Filter products based on the search term
    const filteredData = dataRender.filter(item => item.name.toLowerCase().includes(searchTerm));

    // Render the filtered products
    renderFilteredData(filteredData);
};

// Function to render filtered products
const renderFilteredData = (filteredData) => {
    const productList = document.getElementById("product-list");
    productList.innerHTML = ''; // Clear previous content

    if (filteredData.length === 0) {
        var listItem = document.createElement("div");
        listItem.className = "col-lg-4 col-md-6 col-sm-6";
        listItem.innerHTML = `<p>No matching products found</p>`;
        productList.appendChild(listItem);
    } else {
        filteredData.forEach((item) => {
            var listItem = document.createElement("div");
            listItem.className = "col-lg-4 col-md-6 col-sm-6";
            listItem.innerHTML = `
            <!-- Your existing product HTML here -->
            `;
            productList.appendChild(listItem);
        });
    }
};

renderData();
