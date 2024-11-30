//For Card Number//
document.getElementById("first").oninput = () => {
  document.getElementById("one").innerText =
    document.getElementById("first").value;
  first.value = first.value.replace(/[^0-9]/g, "");
};

document.getElementById("second").oninput = () => {
  document.getElementById("two").innerText =
    document.getElementById("second").value;
  second.value = second.value.replace(/[^0-9]/g, "");
};

document.getElementById("third").oninput = () => {
  document.getElementById("three").innerText =
    document.getElementById("third").value;
  third.value = third.value.replace(/[^0-9]/g, "");
};

document.getElementById("fourth").oninput = () => {
  document.getElementById("four").innerText =
    document.getElementById("fourth").value;
  fourth.value = fourth.value.replace(/[^0-9]/g, "");
};

//For CCV box//
document.getElementById("ccvBox").oninput = () => {
  document.getElementById("ccvBox").innerText =
    document.getElementById("ccvBox").value;
  ccvBox.value = ccvBox.value.replace(/[^0-9]/g, "");
};

//For Card Holder//
document.querySelector(".card-holder-input").oninput = () => {
  document.querySelector(".card-holder-name").innerText =
    document.querySelector(".card-holder-input").value;
};

//For Expiration date//
document.querySelector(".month-input").oninput = () => {
  document.querySelector(".exp-month").innerText =
    document.querySelector(".month-input").value;
};

document.querySelector(".year-input").oninput = () => {
  document.querySelector(".exp-year").innerText =
    document.querySelector(".year-input").value;
};

//To change Logo//
const first = document.getElementById("first");
const logo = document.getElementById("logo");

first.addEventListener("input", function () {
  const inputValue = first.value;
  changeCardLogo(inputValue);
});

function changeCardLogo(inputValue) {
  if (inputValue.startsWith("5") || inputValue.startsWith("2")) {
    logo.src = "./images/mastercard.png";
  } else if (inputValue.startsWith("4")) {
    logo.src = "./images/visa.png";
  } else if (inputValue.startsWith("3")) {
    logo.src = "./images/amex.png";
  }
}

//Submission//
var form = document.getElementById("form");
var message = document.getElementById("message");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  //message.textContent = "Your payment was successful";
  alert("Your payment was successful");
});
