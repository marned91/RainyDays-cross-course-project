import { updateCartIcon } from "./utils/updateCartIcon.mjs";
import { displayLoading, hideLoading } from "./utils/loadingSpinner.mjs";
import { alertUser } from "./utils/errorHandler.mjs";


document.addEventListener("DOMContentLoaded", () => {
  try {
    updateCartIcon();
    addCartHeader();
    cartContent();
    handleLoading();
  } catch (error) {
      alertUser(error.message);
  } 
});

async function handleLoading() {
  try {
    displayLoading();
  } catch (error){
    //Avoidng error message as it just includes loading spinner. If it's not displaying, it's not worth an alert for the user?
  } finally {
    hideLoading();
  }
}

function addCartHeader () {
  const checkoutHeader = document.querySelector("#cart-header");
  checkoutHeader.textContent = "YOUR SHOPPING CART";
}

function createCartItemElement(item) {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.className = "cart-item";

  const cartDetailsWrapper = document.createElement("div");
  cartDetailsWrapper.className = "cart-details-wrapper";

  const productTitle = document.createElement("h3");
  productTitle.textContent = `Jacket: ${item.title}`;

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.title;
  img.className = "item_img";

  const productSize = document.createElement("p");
  productSize.textContent = `Size: ${item.size}`;

  const productColor = document.createElement("p");
  productColor.textContent = `Color: ${item.color}`;

  const productQuantity = document.createElement("p");
  productQuantity.textContent = `Quantity: ${item.quantity}`;

  const productTotalPrice = item.quantity * item.price;
  const productPrice = document.createElement("p");
  productPrice.textContent = `Price: NOK ${productTotalPrice.toFixed(2)}`;

  const removeItemButton = document.createElement("button");
  removeItemButton.textContent = "Remove";
  removeItemButton.className = "remove-button";
  removeItemButton.className = "second-button";
  removeItemButton.addEventListener("click", () => {
    removeFromCart(item);
  });

  cartDetailsWrapper.appendChild(productTitle);
  cartDetailsWrapper.appendChild(productSize);
  cartDetailsWrapper.appendChild(productColor);
  cartDetailsWrapper.appendChild(productQuantity);
  cartDetailsWrapper.appendChild(productPrice);
  cartDetailsWrapper.appendChild(removeItemButton);

  cartItemDiv.append(img);
  cartItemDiv.append(cartDetailsWrapper);

  return cartItemDiv;
}

function cartTotalPrice() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let totalPrice = 0;

  cart.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  return totalPrice;
}

function cartContent() {
  try {
    const cartData = localStorage.getItem("cart");
    const cart = JSON.parse(cartData) || [];
    const cartProductsDiv = document.querySelector("#cart-products");
    const checkoutContainer = document.querySelector("#checkout-button");

    if (!cartProductsDiv || !checkoutContainer) {
      throw new Error("Cart products could not be found, please reload the page");
    }

    cartProductsDiv.innerHTML = "";

    if (cart.length === 0) {
      const emptyCartMessage = document.createElement("p");
      emptyCartMessage.textContent = "Looks like you have not added anything to your cart yet!";
      emptyCartMessage.className = "empty-cart-text";
      cartProductsDiv.appendChild(emptyCartMessage);

      checkoutContainer.innerHTML = "";
    } else {
      cart.forEach((item) => {
        const cartItemElement = createCartItemElement(item);
        cartProductsDiv.appendChild(cartItemElement);
      });

      const totalPrice = cartTotalPrice();
      const totalPriceElement = document.createElement("p");
      totalPriceElement.textContent = `Total Price: NOK ${totalPrice.toFixed(2)}`;
      totalPriceElement.className = "total-price";

      const cartSummaryWrapper = document.createElement("div");
      cartSummaryWrapper.className = "cart-checkout";

      const cartSummary = document.createElement("h3");
      cartSummary.textContent = "CART SUMMARY:";
      cartSummary.className = "cart-summary"
      cartSummaryWrapper.appendChild(cartSummary);

      cartSummaryWrapper.appendChild(totalPriceElement);

      if(checkoutContainer.innerHTML === "") {
        const checkoutButton = document.createElement("button");
        checkoutButton.textContent ="Buy Now";
        checkoutButton.className = "second-button";
        checkoutButton.id = "buy-now-button"
        checkoutButton.addEventListener("click", () => {
          clearCart();
          window.location.href = "./confirmation/index.html";
        });

        cartSummaryWrapper.appendChild(checkoutButton);
        cartProductsDiv.appendChild(cartSummaryWrapper);
      }
      
    }
  } catch (error) {
    alertUser(
      "Sorry, we're having trouble loading your cart. Please try to refresh the page");
  }
}

function removeFromCart(itemsToRemove) {
  try {
    const cartData = localStorage.getItem("cart");
    const cart = JSON.parse(cartData) || [];

    const updatedCart = cart.filter (
        (item) => item.id !== itemsToRemove.id || item.size !== itemsToRemove.size
    );

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    updateCartIcon();
    cartContent();

  } catch (error) {;
    alertUser("Something went wrong while removing items from your cart. Please try to reload the page");
  }
}

function clearCart() {
  localStorage.removeItem("cart");

  updateCartIcon();
}