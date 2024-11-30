import { calculateCartQuantity, cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryoptions.js";
import { formatCurrency } from "../utilities/money.js";

export function renderPaymentSummary() {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  cart.forEach((cartItem) => {
    // Get the product and check if it exists
    const product = getProduct(cartItem.productId);
    if (product && product.priceCents !== undefined) {
      productPriceCents += product.priceCents * cartItem.quantity;
    }

    // Get the delivery option and check if it exists
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    if (deliveryOption && deliveryOption.priceCents !== undefined) {
      shippingPriceCents += deliveryOption.priceCents;
    }
  });

  // Optionally, add both product and shipping prices to get the total price
  const totalPriceCents = productPriceCents + shippingPriceCents;

  const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
  const taxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + taxCents;

  const paymentSummaryHTML = `
    <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div class = 'payment-cart-quantity'></div>
            <div class="payment-summary-money">$${formatCurrency(
              productPriceCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">
            $${formatCurrency(shippingPriceCents)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalBeforeTaxCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(
              taxCents
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(
              totalCents
            )}</div>
          </div>
     <div id="sign-out-modal" class="modal">
        <div class="modal-content">
          <p>
           You need to sign in to complete your payment <br> Would you like to Sign in now?
          </p>
          <button id="confirm-sign-out" class="modal-btn">Yes</button>
          <button id="cancel-sign-out" class="modal-btn">No</button>
        </div>
      </div>


           <a class="payment-link pay-btn">
            Place your order</a
          >
         

          `;

  const displayPaymentSummaryHTML = document.querySelector(".payment-summary");
  displayPaymentSummaryHTML.innerHTML = paymentSummaryHTML;

  const displayPaymentCartItems = document.querySelector(
    ".payment-cart-quantity"
  );
  displayPaymentCartItems.innerHTML = `Items (${calculateCartQuantity()}):`;
  const signOutModal = document.getElementById("sign-out-modal");
  const confirmSignOutBtn = document.getElementById("confirm-sign-out");
  const cancelSignOutBtn = document.getElementById("cancel-sign-out");
  const paymentLink = document.querySelector(".pay-btn");

  paymentLink.addEventListener("click", () => {
    signOutModal.style.display = "flex";
    console.log("signout");

    confirmSignOutBtn.addEventListener("click", () => {
      window.location.href = "paymentsignin.html";
    });

    cancelSignOutBtn.addEventListener("click", () => {
      signOutModal.style.display = "none";
      window.location.href = "checkout.html";
    });
  });
}
