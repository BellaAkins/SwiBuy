import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateCartNewQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";

let allCartSummaryHTML = "";

cart.forEach((cartItem) => {
  const productId = cartItem.productId;

  let matchingProduct;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  allCartSummaryHTML += `
   <div class="cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">Delivery date: Tuesday, June 21</div>

              <div class="cart-item-details-grid">
                <img
                  class="product-image"
                  src="${matchingProduct.image}"
                />

                <div class="cart-item-details">
                  <div class="product-name">${matchingProduct.name}</div>
                  <div class="product-price">$${formatCurrency(
                    matchingProduct.priceCents
                  )}</div>
                  <div class="product-quantity">
                 <span>Quantity: <span class="quantity-label js-quantity-label-${
                   matchingProduct.id
                 }">${cartItem.quantity}</span></span>
                    </span>
                     <span class="update-quantity-link link-primary update-link" data-product-id="${
                       matchingProduct.id
                     }">Update</span>
                    <input  class="quantity-input  js-quantity-input-${
                      matchingProduct.id
                    }">
                 <span class="save-quantity-link link-primary" data-product-id="${
                   matchingProduct.id
                 }">Save</span>    
                    <span class="delete-quantity-link link-primary" data-product-id='${
                      matchingProduct.id
                    }'>
                      Delete
                    </span>
                  </div>
                </div>

                <div class="delivery-options">
                  <div class="delivery-options-title">
                    Choose a delivery option:
                  </div>
                  <div class="delivery-option">
                    <input
                      type="radio"
                      checked
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">Tuesday, June 21</div>
                      <div class="delivery-option-price">FREE Shipping</div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input
                      type="radio"
                      class="delivery-option-input"
                     name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">Wednesday, June 15</div>
                      <div class="delivery-option-price">$4.99 - Shipping</div>
                    </div>
                  </div>
                  <div class="delivery-option">
                    <input
                      type="radio"
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">Monday, June 13</div>
                      <div class="delivery-option-price">$9.99 - Shipping</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `;
});

const cartOrder = document.querySelector(".order-summary");
cartOrder.innerHTML = allCartSummaryHTML;
//Delete btn
const deleteOrder = document.querySelectorAll(".delete-quantity-link");
deleteOrder.forEach((deleteLink) => {
  deleteLink.addEventListener("click", () => {
    const productId = deleteLink.dataset.productId;
    removeFromCart(productId);
    const cartItemContainer = document.querySelector(
      `.cart-item-container-${productId}`
    );
    cartItemContainer.remove();
  });
});
//To update cart quantity on the checkout header
function updateCartQuantity() {
  const cartQuantity = calculateCartQuantity();
  const theCartItemQuantity = document.querySelector(".cart-item-quantity");
  theCartItemQuantity.innerHTML = `You have <span>${cartQuantity} items</span> in your Cart`;
}
updateCartQuantity();
//Update btn
const updateOrder = document.querySelectorAll(".update-quantity-link");
updateOrder.forEach((updateLink) => {
  updateLink.addEventListener("click", () => {
    const productId = updateLink.dataset.productId;
    const cartItemContainer = document.querySelector(
      `.cart-item-container-${productId}`
    );
    cartItemContainer.classList.add("edit-quantity");
  });
});

const saveOrder = document.querySelectorAll(".save-quantity-link");
saveOrder.forEach((saveLink) => {
  saveLink.addEventListener("click", () => {
    //console.log("save");

    const productId = saveLink.dataset.productId;
    const inputQuantity = document.querySelector(
      `.js-quantity-input-${productId}`
    );
    console.log(inputQuantity);
    //converting number input to number
    const newQuantity = Number(inputQuantity.value);

    if (newQuantity < 0 || newQuantity >= 1000) {
      alert("Quantity must be at least 0 and less than 1000");
      return;
    }

    updateCartNewQuantity(productId, newQuantity);

    const cartItemContainer = document.querySelector(
      `.cart-item-container-${productId}`
    );
    cartItemContainer.classList.remove("edit-quantity");
    //To display new quantity value from  quantity input on checkout page
    const displayNewCartQuantity = document.querySelector(
      `.js-quantity-label-${productId}`
    );
    displayNewCartQuantity.innerHTML = newQuantity;

    //Run updateCartQuantity function again so it can update the checkout header
    updateCartQuantity();
  });
  //To use keyboard
  const inputQuantity = document.querySelector(
    `.js-quantity-input-${saveLink.dataset.productId}`
  );
  inputQuantity.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      saveLink.click();
    }
  });
});
