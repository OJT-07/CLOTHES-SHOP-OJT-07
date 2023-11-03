class CommonFooter extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
      this.innerHTML = `
      
<link rel="stylesheet" href="../CSS/footer.css">
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
  class CommonHeader extends HTMLElement {
    constructor() {
      super();
    }
    connectedCallback() {
        
      this.innerHTML = `
      <link rel="stylesheet" href="../CSS/header.css">
      <header class="header">
    <div class="container">
        <div class="row">
            <div class="col-lg-3 col-md-3">
                <div class="header__logo">
                    <a href="../index.html"><img src=" /img/logo.png" alt=""></a>
                </div>
            </div>
            <div class="col-lg-6 col-md-6">
                <nav class="header__menu mobile-menu">
                    <ul>
                        <li class="active"><a href="../index.html">Home</a></li>
                        <li><a href="../shop.html">Shop</a></li>
                        <li><a href="#">Pages</a>
                            <ul class="dropdown">
                                <li><a href="../about.html">About Us</a></li>
                                <li><a href="../shop-details.html">Shop Details</a></li>
                                <li><a href="../shopping-cart.html">Shopping Cart</a></li>
                                <li><a href="../checkout.html">Check Out</a></li>
                                <li><a href="../blog-details.html">Blog Details</a></li>
                            </ul>
                        </li>
                        <li><a href="../blog.html">Blog</a></li>
                        <li><a href="../contact.html">Contacts</a></li>
                    </ul>
                </nav>
            </div>
            <div class="col-lg-3 col-md-3">
                <div class="header__nav__option">
                    <a href="#" class="search-switch"><img src="../img/icon/search.png" alt=""></a>
                    <a href="#"><img src="/img/icon/heart.png" alt=""></a>
                    <a href="#"><img src="/img/icon/cart.png" alt=""> <span>0</span></a>
                    <div class="price">$0.00</div>
                </div>
            </div>
        </div>
        <div class="canvas__open"><i class="fa fa-bars"></i></div>
    </div>
</header>
  
      `;
    }
  }
  customElements.define("common-footer", CommonFooter);
  customElements.define("common-header", CommonHeader);
