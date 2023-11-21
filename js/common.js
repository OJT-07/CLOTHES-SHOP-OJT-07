var retrievedValue = localStorage.getItem('user');
var script = document.createElement('script');


script.src = '/Customer/LoginAndRegister/Login/logout.js';
document.head.appendChild(script);
class CommonFooter extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
      
<link rel="stylesheet" href="https://sprint2--shop-men-fashion.netlify.app/Customer/CSS/footer.css">
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
                <div class="footer__about">
                    <div class="footer__logo">
                        <a href="#"><img src="/img/footer-logo.png" alt=""></a>
                    </div>
                    <p>The customer is at the heart of our unique business model, which includes design.</p>
                    <a href="#"><img src="/img/payment.png" alt=""></a>
                </div>
            </div>
            <div class="col-lg-2 offset-lg-1 col-md-3 col-sm-6">
                <div class="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                        <li><a href="#">Clothing Store</a></li>
                        <li><a href="#">Trending Shoes</a></li>
                        <li><a href="#">Accessories</a></li>
                        <li><a href="#">Sale</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-2 col-md-3 col-sm-6">
                <div class="footer__widget">
                    <h6>Shopping</h6>
                    <ul>
                        <li><a href="#">Contact Us</a></li>
                        <li><a href="#">Payment Methods</a></li>
                        <li><a href="#">Delivary</a></li>
                        <li><a href="#">Return &amp; Exchanges</a></li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 offset-lg-1 col-md-6 col-sm-6">
                <div class="footer__widget">
                    <h6>About Us</h6>
                    <div class="footer__newslatter">
                        <p>Be the first to know about new arrivals, look books, sales &amp; promos!</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-12 text-center">
                <div class="footer__copyright__text">              
                    <p>Copyright ©
                        <script>
                            document.write(new Date().getFullYear());
                        </script>20232020
                        All rights reserved | This template is made with <i class="fa fa-heart-o" aria-hidden="true"></i> by Tech Tribe</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</footer>
      `;
    }
}
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
        if (!localStorage.getItem('user')) {
            window.location.href = '/Customer/LoginAndRegister/Login/Login.html';
            return;
        }

        const token = getBearerToken();

        const response = await fetch('https://web-api-5vrh.onrender.com/api/auth/get_me', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        console.log("🚀 ~ file: common.js:95 ~ fetchData ~ response:", response);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("🚀 ~ file: common.js:108 ~ fetchData ~ data:", data)

        return data;

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}




class CommonHeader extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        var retrievedValue = localStorage.getItem('user');
        // console.log(retrievedValue);
        fetchData().then(data => {
            let role = "user"
         if(data) { role =  data.user.role; }
           
            this.innerHTML = `
            <script src="/Customer/LoginAndRegister/Login/logout.js"></script>
            <link rel="stylesheet" href="https://sprint2--shop-men-fashion.netlify.app/Customer/CSS/header.css">
            <header class="header">

          <div class="container">
              <div class="row">
                  <div class="col-lg-3 col-md-3">
                      <div class="header__logo">
                          <a href="/Customer/HomePage/Index.html"><img src=" /img/logo.png" alt=""></a>
                      </div>
                  </div>
                  <div class="col-lg-6 col-md-6">
                  <nav class="header__menu mobile-menu">
                      <ul class="headerAll">
                          <li ><a href="/Customer/HomePage/">Home</a></li>
                          <li><a href="/Customer/Product/productList.html">Shop</a></li>
                           <li><a href="/Customer/Master Page/contactUs.html">Contact Us</a></li>
                            ${role === "admin" ? '<li ><a href="../../Admin/adminPage.html">Admin</a></li>' : ''}
                      </ul>
                  </nav>
              </div>
                <div class="col-lg-3 col-md-3">
                  <div class="header__nav__option">
                      <a href="#"><i class="fa-solid fa-heart icon_header"></i></a>
                      <a href="/Customer/Cart/listcard.html"><i class="fa-solid fa-cart-shopping icon_header"></i><span>0</span></a>
                      ${retrievedValue === null ? `
                      <a href="Customer/HomePage/LoginAndRegister/Login/Login.html"><i class="fa-solid fa-right-to-bracket fa-rotate-180 icon_header"></i></a>
                        ` : `
                        <a onclick="logout() "><i class="fa-solid fa-right-to-bracket icon_header"></i></a>
                        `}   
                  
              </div>
           
              <div class="canvas__open"><i class="fa fa-bars"></i></div>
          </div>
      </header>
        
            `;
        })
    }
}
class CommonCss extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
      <link rel="stylesheet" href="/css/bootstrap.min.css" type="text/css">
      <link rel="stylesheet" href="/css/font-awesome.min.css" type="text/css">
      <link rel="stylesheet" href="/css/elegant-icons.css" type="text/css">
      <link rel="stylesheet" href="/css/magnific-popup.css" type="text/css">
      <link rel="stylesheet" href="/css/nice-select.css" type="text/css">
      <link rel="stylesheet" href="/css/owl.carousel.min.css" type="text/css">
      <link rel="stylesheet" href="/css/slicknav.min.css" type="text/css">
      <link rel="stylesheet" href="/css/style.css" type="text/css">
      <script src="../../js/common.js"></script>
      `;
    }
}
class CommonSidebar extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.innerHTML = `
    <body>
    <section class="shop spad">
        <div class="container">
            <div class="row">
                <div class="col-lg-12">
                    <div class="shop__sidebar">
                        <div class="shop__sidebar__search">
                            <form action="#">
                                <input type="text" placeholder="Search...">
                                <button type="submit"><span class="icon_search"></span></button>
                            </form>
                        </div>
                        <div class="shop__sidebar__accordion">
                            <div class="accordion" id="accordionExample">
                                <div class="card">
                                    <div class="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseOne">Categories</a>
                                    </div>
                                    <div id="collapseOne" class="collapse show" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="shop__sidebar__categories">
                                                <ul class="nice-scroll">
                                                    <li><a href="#">Men (20)</a></li>
                                                    <li><a href="#">Women (20)</a></li>
                                                    <li><a href="#">Bags (20)</a></li>
                                                    <li><a href="#">Clothing (20)</a></li>
                                                    <li><a href="#">Shoes (20)</a></li>
                                                    <li><a href="#">Accessories (20)</a></li>
                                                    <li><a href="#">Kids (20)</a></li>
                                                    <li><a href="#">Kids (20)</a></li>
                                                    <li><a href="#">Kids (20)</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseTwo">Branding</a>
                                    </div>
                                    <div id="collapseTwo" class="collapse show" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="shop__sidebar__brand">
                                                <ul>
                                                    <li><a href="#">Louis Vuitton</a></li>
                                                    <li><a href="#">Chanel</a></li>
                                                    <li><a href="#">Hermes</a></li>
                                                    <li><a href="#">Gucci</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseThree">Filter Price</a>
                                    </div>
                                    <div id="collapseThree" class="collapse show" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="shop__sidebar__price">
                                                <ul>
                                                    <li><a href="#">$0.00 - $50.00</a></li>
                                                    <li><a href="#">$50.00 - $100.00</a></li>
                                                    <li><a href="#">$100.00 - $150.00</a></li>
                                                    <li><a href="#">$150.00 - $200.00</a></li>
                                                    <li><a href="#">$200.00 - $250.00</a></li>
                                                    <li><a href="#">250.00+</a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseFour">Size</a>
                                    </div>
                                    <div id="collapseFour" class="collapse show" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="shop__sidebar__size">
                                                <label for="xs">xs
                                                    <input type="radio" id="xs">
                                                </label>
                                                <label for="sm">s
                                                    <input type="radio" id="sm">
                                                </label>
                                                <label for="md">m
                                                    <input type="radio" id="md">
                                                </label>
                                                <label for="xl">xl
                                                    <input type="radio" id="xl">
                                                </label>
                                                <label for="2xl">2xl
                                                    <input type="radio" id="2xl">
                                                </label>
                                                <label for="xxl">xxl
                                                    <input type="radio" id="xxl">
                                                </label>
                                                <label for="3xl">3xl
                                                    <input type="radio" id="3xl">
                                                </label>
                                                <label for="4xl">4xl
                                                    <input type="radio" id="4xl">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseFive">Colors</a>
                                    </div>
                                    <div id="collapseFive" class="collapse show" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="shop__sidebar__color">
                                                <label class="c-1" for="sp-1">
                                                    <input type="radio" id="sp-1">
                                                </label>
                                                <label class="c-2" for="sp-2">
                                                    <input type="radio" id="sp-2">
                                                </label>
                                                <label class="c-3" for="sp-3">
                                                    <input type="radio" id="sp-3">
                                                </label>
                                                <label class="c-4" for="sp-4">
                                                    <input type="radio" id="sp-4">
                                                </label>
                                                <label class="c-5" for="sp-5">
                                                    <input type="radio" id="sp-5">
                                                </label>
                                                <label class="c-6" for="sp-6">
                                                    <input type="radio" id="sp-6">
                                                </label>
                                                <label class="c-7" for="sp-7">
                                                    <input type="radio" id="sp-7">
                                                </label>
                                                <label class="c-8" for="sp-8">
                                                    <input type="radio" id="sp-8">
                                                </label>
                                                <label class="c-9" for="sp-9">
                                                    <input type="radio" id="sp-9">
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="card">
                                    <div class="card-heading">
                                        <a data-toggle="collapse" data-target="#collapseSix">Tags</a>
                                    </div>
                                    <div id="collapseSix" class="collapse show" data-parent="#accordionExample">
                                        <div class="card-body">
                                            <div class="shop__sidebar__tags">
                                                <a href="#">Product</a>
                                                <a href="#">Bags</a>
                                                <a href="#">Shoes</a>
                                                <a href="#">Fashio</a>
                                                <a href="#">Clothing</a>
                                                <a href="#">Hats</a>
                                                <a href="#">Accessories</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <script src="/js/jquery-3.3.1.min.js"></script>
    <script src="/js/bootstrap.min.js"></script>
    <script src="/js/jquery.nice-select.min.js"></script>
    <script src="/js/jquery.nicescroll.min.js"></script>
    <script src="/js/jquery.magnific-popup.min.js"></script>
    <script src="/js/jquery.countdown.min.js"></script>
    <script src="/js/jquery.slicknav.js"></script>
    <script src="/js/mixitup.min.js"></script>
    <script src="/js/owl.carousel.min.js"></script>
    <script src="/js/main.js"></script>
    <script src="https://kit.fontawesome.com/c7429944f7.js" crossorigin="anonymous"></script>
</body>
      `;
    }
}
customElements.define("common-sidebar", CommonSidebar);

customElements.define("common-css", CommonCss);
customElements.define("common-footer", CommonFooter);
customElements.define("common-header", CommonHeader);
