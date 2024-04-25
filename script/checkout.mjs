import { displayLoading, hideLoading } from "./utils/loadingSpinner.mjs";
import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";
import { updateCartIcon } from "./utils/updateCartIcon.mjs";

document.addEventListener("DOMContentLoaded", () => {
  try {
    updateCartIcon();
    cartContent();
  } catch (error) {
    alert(
      "Oops, something went wrong while loading the checkout page. Please try refreshing the page.");
  }
});

function createCartItemElement(item) {
  const cartItemDiv = document.createElement("div");
  cartItemDiv.className = "cart-item";

  const productTitle = document.createElement("h3");
  productTitle.textContent = `Jacket: ${item.title}`;

  const img = document.createElement("img");
  img.src = item.image;
  img.alt = item.title;
  img.className = "item_img";
  console.log("Image URL:", item.image);

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
  removeItemButton.addEventListener("click", () => {
    console.log("Remove button clicked for item:", item);
    removeFromCart(item);
  });

  cartItemDiv.append(
    productTitle, 
    img,
    productSize, 
    productColor, 
    productQuantity, 
    productPrice,
    removeItemButton
  );

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
      throw new Error("Cart products could not be found");
    }

    cartProductsDiv.innerHTML = "";

    if (cart.length === 0) {
      const emptyCartMessage = document.createElement("p");
      emptyCartMessage.textContent = "Your cart is currently empty";
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

      cartProductsDiv.appendChild(totalPriceElement);

      if(!checkoutContainer.innerHTML) {
        const checkoutButton = document.createElement("button");
        checkoutButton.textContent ="Buy Now";
        checkoutButton.addEventListener("click", () => {
            window.location.href = "./confirmation/index.html";
        });

        checkoutContainer.innerHTML= "";
        checkoutContainer.appendChild(checkoutButton);
      }
    }
  } catch (error) {
    console.log("Error loading cart content:", error);
    alert(
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

    if(cart.length !== updatedCart.length) {
        cartContent();
    }

  } catch (error) {
    console.error("Error removing item from cart:", error);
    alert("Something went wrong while removing items from your cart. Please try to reload the page");
  }
}
