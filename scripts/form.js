import { clearStorage } from "../data/cart.js";

document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirm-password");
  const submitButton = document.getElementById("submit-btn");
  const form = document.getElementById("registration-form");
  const passwordError = document.getElementById("password-error");

  // function to validate the email format
  function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  // Function to check form validity
  function checkFormValidity() {
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();
    // Check if password is at least 6 characters long
    const isPasswordValid = password.length >= 6;
    // Show password error if it's not long enough
    if (!isPasswordValid) {
      passwordError.style.display = "block";
    } else {
      passwordError.style.display = "none";
    }

    if (
      isValidEmail(email) &&
      password.length >= 6 &&
      password === confirmPassword
    ) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }

  // Event listeners
  emailInput.addEventListener("input", checkFormValidity);
  passwordInput.addEventListener("input", checkFormValidity);
  confirmPasswordInput.addEventListener("input", checkFormValidity);

  // Form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission

    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    alert("Welcome to SwiBuy!");
    window.location.href = "index.html"; // Redirect to main page
  });
  //Dialogue box
  const signOutBtn = document.getElementById("sign-out-btn");
  const signOutModal = document.getElementById("sign-out-modal");
  const confirmSignOutBtn = document.getElementById("confirm-sign-out");
  const cancelSignOutBtn = document.getElementById("cancel-sign-out");

  signOutBtn.addEventListener("click", () => {
    signOutModal.style.display = "flex";
    console.log("signout");
  });

  confirmSignOutBtn.addEventListener("click", () => {
    console.log("clear");
    clearStorage();
    window.location.href = "index.html";
  });

  cancelSignOutBtn.addEventListener("click", () => {
    signOutModal.style.display = "none";
  });
});
