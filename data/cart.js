//get cart from local storage
export let cart = JSON.parse(localStorage.getItem("cart"));
if (!cart) {
  cart = [
    {
      productId: "1",
      quantity: 2,
    },

    {
      productId: "2",
      quantity: 3,
    },
  ];
}
/*
 */

function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(productId) {
  //Check for matching product in cart

  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem; //Check if product(item) is in the cart
    }
  });
  //CALCULATING CART QUANTITY
  //Using quantity selector for quantity
  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}` //template string so we can use ${}
  );
  const quantity = Number(quantitySelector.value);

  //Add products to the cart
  if (matchingItem) {
    matchingItem.quantity += quantity; //if there is a matching item increase quantity by number selected
  } else {
    //else push normally
    cart.push({
      productId,
      quantity,
    });
  }

  //save to storage
  saveToStorage();
}

//Remove Product to cart
export function removeFromCart(productId) {
  const newCart = [];
  cart.forEach((cartItem) => {
    if (cartItem.productId !== productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;

  //save to storage
  saveToStorage();
}

export function calculateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });

  return cartQuantity;
}
export function updateCartNewQuantity(productId, newQuantity) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.quantity = newQuantity;
  saveToStorage();
}
