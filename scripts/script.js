import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";
import { cart, addToCart, calculateCartQuantity } from "../data/cart.js";

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

//Shop now

let allProductsHTML = "";
//using accumulator pattern
products.forEach((theProduct) => {
  allProductsHTML += `
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

const productsGrid = document.querySelector(".products-grid");
//console.log(productsGrid);
productsGrid.innerHTML = allProductsHTML;
//Update cart quantity and display on page
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  const displayCartQuantity = document.querySelector(".cart-quantity");
  displayCartQuantity.innerHTML = cartQuantity;
}

updateCartQuantity();
//Display added message when add to cart btn is clicked
function displayAddedMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.classList.add("add-message-visible");

  setTimeout(() => {
    addedMessage.classList.remove("add-message-visible");
  }, 2000);
}

/*
function updateCartQuantity(productId) {
  //TO calculate cart quantity and update on page
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;

    return cartQuantity;
  });

  const displayCartQuantity = document.querySelector(".cart-quantity");
  displayCartQuantity.innerHTML = cartQuantity;

  displayAddedMessage(productId);
}*/

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");
//Add product to cart
addToCartBtn.forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    const productId = cartButton.dataset.productId;
    addToCart(productId);
    updateCartQuantity(productId);
  });
});
