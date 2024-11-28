import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utilities/money.js";
/*const products = [
  {
    image: "images/products/athletic-cotton-socks-6-pairs.jpg",
    name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
    ratings: {
      stars: 4.5,
      count: 87,
    },
    priceCents: 1090,
  },
  {
    image: "images/products/intermediate-composite-basketball.jpg",
    name: " Intermediate Size Basketball",
    ratings: {
      stars: 4,
      count: 127,
    },
    priceCents: 2095,
  },
  {
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: " Adults Plain Cotton T-Shirt - 2 Pack",
    ratings: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
  },
  {
    image: "images/products/black-2-slot-toaster.jpg",
    name: " 2 Slot Toaster - Black",
    ratings: {
      stars: 5,
      count: 2197,
    },
    priceCents: 1899,
  },
];*/

//const cart = [];

let allProductsHTML = ""; //To combine all html products

products.forEach((theProduct) => {
  /*Accumulator pattern*/ allProductsHTML += `
         <div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${theProduct.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${theProduct.name}
          </div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="images/ratings/rating-${theProduct.rating.stars * 10}.png"
            />
            <div class="product-rating-count link-primary">${
              theProduct.rating.count
            }</div>
          </div>

          <div class="product-price">$${formatCurrency(
            theProduct.priceCents
          )}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${theProduct.id}" >
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${theProduct.id}">
            <img src="images/icons/checkmark.png" />
            Added to Cart
          </div>

          <button class="add-to-cart-button button-primary add-to-cart-btn"
          data-product-id="${theProduct.id}"
          >Add to Cart</button>
        </div>`;
});

//theProduct.id means products (the array name) .id(value saved as and it must be unique)
//console.log(allProductsHTML);
const productsGrid = document.querySelector(".products-grid");
productsGrid.innerHTML = allProductsHTML;

function updateCartQuantity() {
  // let cartQuantity = 0;
  //cart.forEach((item) => {
  //  cartQuantity += item.quantity;
  //});
  //used module to Replace above code with calculateCartQuantity from cart.js
  //UPDATE QUANTITY ON PAGE
  const cartQuantity = calculateCartQuantity();
  const displayCartQuantity = document.querySelector(".cart-quantity");
  displayCartQuantity.innerHTML = cartQuantity;
  // console.log(displayCartQuantity);
}

updateCartQuantity();

function displayAddedMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("add-message-visible");

  setTimeout(() => {
    addedMessage.classList.remove("add-message-visible");
  }, 2000);
}

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
addToCartBtn.forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    //const productId = cartButton.dataset.productId; //SAME AS DOWN CODE
    const { productId } = cartButton.dataset; //DESTRUCTURING METHOD
    addToCart(productId);
    updateCartQuantity();
    displayAddedMessage(productId);
    /*
     //ADD PRODUCTS TO CART
    let matchingItem;
    cart.forEach((item) => {
      if (productId === item.productId) {
        matchingItem = item; //To check if product is already in the cart
      }
    });
    //To use selector for Quantity
    const quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}` //template string so we can use ${}
    );

    const quantity = Number(quantitySelector.value);
    //End
    // console.log(quantity);

    // console.log(quantitySelector);
    if (matchingItem) {
      //   matchingItem.quantity += 1;
      matchingItem.quantity += quantity; //If matching item is in the cart increase it by quantity(which is the selector)
    } else {
      //if it is not in the cart push it
      cart.push({
        theProductName: productId,
        //productId: theProductName,
        //  quantity: 1,
        quantity: quantity,
      });
    }
    //END of adding product to cart

    //CALCULATE QUANTITY
    
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    //UPDATE QUANTITY ON PAGE
    const displayCartQuantity = document.querySelector(".cart-quantity");
    displayCartQuantity.innerHTML = cartQuantity;

    //End of calculate cart quantity

    // console.log(displayCartQuantity);
    //ADD MESSAGE AND DISPLAY
    
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);
  addedMessage.classList.add("add-message-visible");

  setTimeout(() => {
    addedMessage.classList.remove("add-message-visible");
  }, 2000);
    //End of add message and display
    */
  });
});
//CHECK ON KEY AND TRY TO WRITE IT WITH FIND LIKE AI
//Nav Bar
const menu = document.querySelector(".menu");
const close = document.querySelector(".close");
const nav = document.querySelector("nav");

menu.addEventListener("click", () => {
  nav.classList.add("open-nav");
});

close.addEventListener("click", () => {
  nav.classList.remove("open-nav");
});
