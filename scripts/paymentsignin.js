import { clearStorage } from "../data/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");
  const signOutBtn = document.getElementById("sign-out-btn");
  const signOutModal = document.getElementById("sign-out-modal");
  const confirmSignOutBtn = document.getElementById("confirm-sign-out");
  const cancelSignOutBtn = document.getElementById("cancel-sign-out");

  // Form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    //  Check if fields are not empty
    if (!email || !password) {
      alert("Please fill in both email and password fields.");
      return;
    }

    alert("Signed in successfully!. You can proceed to make payment");

    // Redirect to payment.html
    window.location.href = "payment.html"; // Redirect to payment
  });

  signOutBtn.addEventListener("click", () => {
    signOutModal.style.display = "flex"; // Show the sign-out modal
  });

  confirmSignOutBtn.addEventListener("click", () => {
    console.log("clear");
    clearStorage(); // Clear storage data

    // Redirect to the shopping section after sign-out
    window.location.href = "index.html#shop-now"; // Redirect to the shop section of index.html
  });

  cancelSignOutBtn.addEventListener("click", () => {
    signOutModal.style.display = "none"; // Hide the sign-out modal if canceled
  });
});
