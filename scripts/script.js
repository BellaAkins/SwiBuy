import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";
import { cart, addToCart } from "../data/cart.js";

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
/*
const products = [
  {
    image: "images/products/men-chino-pants-beige.jpg",
    name: "Men's Classic-fit Pleated Chino Pants",
    rating: {
      stars: 4.5,
      count: 9017,
    },
    priceCents: 2290,
  },

  {
    image: "images/products/men-cozy-fleece-zip-up-hoodie-red.jpg",
    name: "Men's Full-Zip Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 3157,
    },
    priceCents: 2400,
  },

  {
    image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
    name: "Adults Plain Cotton T-Shirt - 2 Pack",
    rating: {
      stars: 4.5,
      count: 56,
    },
    priceCents: 799,
  },

  {
    image: "images/products/plain-hooded-fleece-sweatshirt-yellow.jpg",
    name: "Plain Hooded Fleece Sweatshirt",
    rating: {
      stars: 4.5,
      count: 317,
    },
    priceCents: 2400,
  },

  {
    image: "images/products/women-chiffon-beachwear-coverup-black.jpg",
    name: "Women's Chiffon Beachwear Cover Up - Black",
    rating: {
      stars: 4.5,
      count: 235,
    },
    priceCents: 2070,
  },

  {
    image: "images/products/men-slim-fit-summer-shorts-gray.jpg",
    name: "Men's Slim-Fit Summer Shorts",
    rating: {
      stars: 4,
      count: 160,
    },
    priceCents: 1699,
  },

  {
    image: "images/products/women-stretch-popover-hoodie-black.jpg",
    name: "Women's Stretch Popover Hoodie",
    rating: {
      stars: 4.5,
      count: 2465,
    },
    priceCents: 1374,
  },

  {
    image: "images/products/women-french-terry-fleece-jogger-camo.jpg",
    name: "Women's Fleece Jogger Sweatpant",
    rating: {
      stars: 4.5,
      count: 248,
    },
    priceCents: 2400,
  },
];
*/

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

function displayAddedMessage(productId) {
  const addedMessage = document.querySelector(`.js-added-to-cart-${productId}`);

  addedMessage.classList.add("add-message-visible");

  setTimeout(() => {
    addedMessage.classList.remove("add-message-visible");
  }, 2000);
}

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
}

const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

addToCartBtn.forEach((cartButton) => {
  cartButton.addEventListener("click", () => {
    const productId = cartButton.dataset.productId;
    addToCart(productId);
    updateCartQuantity(productId);
  });
});
