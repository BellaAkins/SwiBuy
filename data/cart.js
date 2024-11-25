export const cart = [];

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
}
