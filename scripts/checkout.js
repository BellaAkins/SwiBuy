import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateCartNewQuantity,
  updateDeliveryOption,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions } from "../data/deliveryoptions.js";


export function renderOrderSummary() {
  let allCartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach((product) => {
      if (product.id === productId) {
        matchingProduct = product;
      }
    });

    const deliveryOptionId = cartItem.deliveryOptionId;

    let deliveryOption;

    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    });

    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
    const dateString = deliveryDate.format("dddd, MMMM, D");

    allCartSummaryHTML += `
   <div class="cart-item-container-${matchingProduct.id}">
              <div class="delivery-date">Delivery date:${dateString}</div>

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
                  ${deliveryOptionsHTML(matchingProduct, cartItem)}
        
    
                </div>
              </div>
            </div>
            `;
  });
  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let theDeliveryOptionHTML = "";

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM, D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE "
          : `$${formatCurrency(deliveryOption.priceCents)}  -`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //Checks if the deliveryOption.id is equal to the deliveryOption.id in the cartItem

      theDeliveryOptionHTML += `       
                       <div class="delivery-option js-delivery-option" 
            data-product-id='${matchingProduct.id}'
            data-delivery-option-id ='${deliveryOption.id}'>
                    <input
                      type="radio"
                        ${isChecked ? "checked" : ""}
                      class="delivery-option-input"
                      name="delivery-option-${matchingProduct.id}"
                    />
                    <div>
                      <div class="delivery-option-date">${dateString}</div>
                      <div class="delivery-option-price">${priceString} Shipping</div>
                    </div>
                  </div>
                  `;
    });

    return theDeliveryOptionHTML;
  }

  const cartOrder = document.querySelector(".order-summary");
  cartOrder.innerHTML = allCartSummaryHTML;
  //Delete btn interactive
  const deleteOrder = document.querySelectorAll(".delete-quantity-link");
  deleteOrder.forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);
      const cartItemContainer = document.querySelector(
        `.cart-item-container-${productId}`
      );
      cartItemContainer.remove();
      updateCartQuantity();
    });
  });
  //To update cart quantity on the checkout header
  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    const theCartItemQuantity = document.querySelector(".cart-item-quantity");
    theCartItemQuantity.innerHTML = `You have <span>${cartQuantity} items</span> in your Cart`;
  }
  updateCartQuantity();
  //Update btn interactive
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
  //Save btn interactive
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
  //DeliveryOption btn interactive
  const checkDeliveryOption = document.querySelectorAll(".js-delivery-option");
  checkDeliveryOption.forEach((optionElement) => {
    optionElement.addEventListener("click", () => {
      const { productId, deliveryOptionId } = optionElement.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
    });
  });
}

renderOrderSummary();
