const renderData = async () => {
const response = await fetch(`https://web-api-5vrh.onrender.com/api/orders/${orders._id}`);
const data = await response.json();

    dataRender.forEach((item) => {
    var listItem = document.createElement("div");
    listItem.className = "col-lg-4 col-md-6 col-sm-6";
    listItem.innerHTML = `
            <div class="product__item">
                <div class="product__item__pic">
                    <a href="../Product/productDetail.html?id=${item._id}"><img src= "${item.image}"/></a>
        
                    <ul class="product__hover">  
                        <li>
                            <a href="#"><img src="/img/icon/heart.png" alt=""></a>
                        </li>
        
                        <li>
                            <a href="#"><img src="/img/icon/compare.png" alt=""> <span>Compare</span></a>
                        </li>
        
                        <li>
                            <a href="#"><img src="/img/icon/search.png" alt=""></a>
                        </li>
                    </ul>
                </div>
        
                <div class="product__item__text">
        
                    <h6>${item.name}</h6>
        
                    <a class="add-cart" onclick="addToCart('${item._id}')">+ Add To Cart</a>
        
                    <div class="rating">
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
        
                    <h5>$${item.price}</h5>
        
                    <div class="product__color__select">
                        <label for="pc-4">
                            <input type="radio" id="pc-4">
                        </label>
        
                        <label class="active black" for="pc-5">
                            <input type="radio" id="pc-5">
                        </label>
        
                        <label class="grey" for="pc-6">
                            <input type="radio" id="pc-6">
                        </label>
                    </div>
                </div>
            </div>
            `;
    productList.appendChild(listItem);
    });
}