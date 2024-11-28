import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateCartNewQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js"; //Named Export
import { formatCurrency } from "../utilities/money.js";
import { hello } from "https://unpkg.com/supersimpledev@1.0.1/hello.esm.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js"; //Default export
import {
  deliveryOptions,
  getDeliveryOption,
  calculateDeliveryDate,
} from "../../data/deliveryoptions.js";
import { renderPaymentSummary } from "./paymentsummary.js";

export function renderOrderSummary() {
  let allCartSummaryHTML = "";

  cart.forEach((cartItem) => {
    const productId = cartItem.productId;

    // Use find instead of foreach to get the matching product
    /*
    const matchingProduct = products.find(
      (product) => product.id === productId
    );*/

    const matchingProduct = getProduct(productId);

    // to check matchingProduct exists before proceeding
    if (matchingProduct) {
      const deliveryOptionId = cartItem.deliveryOptionId;

      let deliveryOption = getDeliveryOption(deliveryOptionId);
      /* arranged into function getDeliveryOption(deliveryOptionId)
      deliveryOptions.forEach((option) => {
        if (option.id === deliveryOptionId) {
          deliveryOption = option;
        }
      });*/
      /*arranged into functioncalculateDeliveryDate(deliveryOption)
      const today = dayjs();
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM, D");*/

      const dateString = calculateDeliveryDate(deliveryOption);

      allCartSummaryHTML += `  
         <div class="cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>

        <div class="cart-item-details-grid">
          <img class="product-image" src="${matchingProduct.image}" />

          <div class="cart-item-details">
            <div class="product-name">${matchingProduct.name}</div>
            <div class="product-price">$${formatCurrency(
              matchingProduct.priceCents
            )}</div>
            <div class="product-quantity">
              <span>Quantity: <span class="quantity-label js-quantity-label-${
                matchingProduct.id
              }">${cartItem.quantity}</span></span>
              <span class="update-quantity-link link-primary update-link" data-product-id="${
                matchingProduct.id
              }">Update</span>
              <input  class="quantity-input  js-quantity-input-${
                matchingProduct.id
              }">
    <span class="save-quantity-link link-primary" data-product-id="${
      matchingProduct.id
    }">Save</span>
              <span class="delete-quantity-link link-primary delete-link" data-product-id="${
                matchingProduct.id
              }">
                Delete
              </span>
            </div>
          </div>
   <div class="delivery-options">
            <div class="delivery-options-title">Choose a delivery option:</div>
           ${deliveryOptionsHTML(matchingProduct, cartItem)}

          </div>
        </div>
      </div>
   `;
    }
  });

  function deliveryOptionsHTML(matchingProduct, cartItem) {
    let theDeliveryOptionsHTML = "";
    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs(); //to get today's date call dayjs()
      const deliveryDate = today.add(deliveryOption.deliveryDays, "days");
      const dateString = deliveryDate.format("dddd, MMMM, D");
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE " //If first part is true the value is what comes after ? if it is false the value is what comes after :
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
      //Tenary operation above

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId; //Checks if the deliveryOption.id is equal to the deliveryOption.id in the cartItem

      theDeliveryOptionsHTML += `        
 
            <div class="delivery-option js-delivery-option" 
            data-product-id='${matchingProduct.id}'
            data-delivery-option-id ='${deliveryOption.id}'>
              <input type="radio"
               ${isChecked ? "checked" : ""}
              class="delivery-option-input" name="delivery-option-${
                matchingProduct.id
              }" />
              <div>
                <div class="delivery-option-date">${dateString}</div>
                <div class="delivery-option-price">${priceString}Shipping</div>
              </div>
            </div>
            
            
            
            `;
    });

    return theDeliveryOptionsHTML;
  }

  // Update the cart summary in the DOM
  const cartOrder = document.querySelector(".order-summary");
  cartOrder.innerHTML = allCartSummaryHTML;

  // Make delete link interactive
  const deleteOrder = document.querySelectorAll(".delete-link");
  deleteOrder.forEach((deleteLink) => {
    deleteLink.addEventListener("click", () => {
      const productId = deleteLink.dataset.productId;
      removeFromCart(productId);

      const cartItemContainer = document.querySelector(
        `.cart-item-container-${productId}`
      );
      if (cartItemContainer) {
        cartItemContainer.remove();
        renderOrderSummary();
        renderPaymentSummary();
      }

      updateCartQuantity();
    });
  });
  //To update cart quantity on the checkout header
  function updateCartQuantity() {
    /* let cartQuantity = 0;
   cart.forEach((cartItem) => {
     cartQuantity += cartItem.quantity;
   });*/
    //Replace above code with calculateCartQuantity from cart.js
    const cartQuantity = calculateCartQuantity();
    //  const returnToHomeLink = document.querySelector(`.return-to-home-link`);
    //  returnToHomeLink.innerHTML = `${cartQuantity} items`;

    const theCartItemQuantity = document.querySelector(".cart-item-quantity");
    theCartItemQuantity.innerHTML = `You have <span>${cartQuantity} items</span> in your Cart`;
  }
  updateCartQuantity();

  //Make update link interactive

  const updateOrder = document.querySelectorAll(".update-link");
  updateOrder.forEach((updateLink) => {
    updateLink.addEventListener("click", () => {
      const productId = updateLink.dataset.productId;

      const cartItemContainer = document.querySelector(
        `.cart-item-container-${productId}`
      );
      cartItemContainer.classList.add("edit-quantity");
    });
  });

  //Make save link interactive

  const saveOrder = document.querySelectorAll(".save-quantity-link");
  saveOrder.forEach((saveLink) => {
    saveLink.addEventListener("click", () => {
      const productId = saveLink.dataset.productId;

      //Make input quantity interactive
      const inputQuantity = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(inputQuantity.value);
      //To validate inputquality value
      if (newQuantity < 0 || newQuantity >= 1000) {
        alert("Quantity must be at least 0 and less than 1000");
        return;
      }
      //const enterKey =

      updateCartNewQuantity(productId, newQuantity);

      const cartItemContainer = document.querySelector(
        `.cart-item-container-${productId}`
      );
      cartItemContainer.classList.remove("edit-quantity");

      //To display new quantity value from  quantity input
      const displayNewCartQuantity = document.querySelector(
        `.js-quantity-label-${productId}`
      );
      displayNewCartQuantity.innerHTML = newQuantity;

      //Run updateCartQuantity function again so i can update the checkout header
      updateCartQuantity();
      renderPaymentSummary();
      //   console.log(displayNewCartQuantity);
    });
    //To use keyboard
    const inputQuantity = document.querySelector(
      `.js-quantity-input-${saveLink.dataset.productId}`
    );
    inputQuantity.addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        saveLink.click(); // Trigger the click event on saveLink
      }
    });
  });
  //CHECK ON KEY AND TRY TO WRITE IT WITH FIND LIKE AI//
  //TO check delivery option
  const checkDeliveryOption = document.querySelectorAll(".js-delivery-option");
  checkDeliveryOption.forEach((optionElement) => {
    optionElement.addEventListener("click", () => {
      const { productId, deliveryOptionId } = optionElement.dataset; //shorthand property
      //  const productId = optionElement.dataset.productId;
      //  const deliveryOptionId = optionElement.dataset.deliveryOptionId
      updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}
renderOrderSummary();
