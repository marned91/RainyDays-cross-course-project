import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";
import { updateCartIcon } from "./utils/updateCartIcon.mjs";
import { displayLoading, hideLoading } from "./utils/loadingSpinner.mjs";

document.addEventListener("DOMContentLoaded", () => {
    updateCartIcon();
  });

function createCartItemElement(item){
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";

    const productTitle = document.createElement ("h3");
    productTitle.textContent = `Jacket: ${item.title}`;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.className = "item_img";
    console.log("Image URL:", item.image);

    const productSize = document.createElement ("p");
    productSize.textContent = `Size: ${item.size}`;

    const productColor = document.createElement ("p");
    productColor.textContent =`Color: ${item.color}`;

    const productQuantity = document.createElement ("p");
    productQuantity.textContent = `Quantity: ${item.quantity}`;

    const productTotalPrice = item.quantity * item.price;
    const productPrice = document.createElement ("p");
    productPrice.textContent = `Price: NOK ${productTotalPrice.toFixed(2)}`;

    const removeItemButton = document.createElement("button");
    removeItemButton.textContent = "Remove";
    removeItemButton.className = "remove-button";
    removeItemButton.addEventListener("click", () => {
        console.log("Remove button clicked for item:", item);
        removeFromCart(item);
    });

    cartItemDiv.append(productTitle);
    cartItemDiv.append(img);
    cartItemDiv.append(productSize);
    cartItemDiv.append(productColor);
    cartItemDiv.append(productQuantity);
    cartItemDiv.append(productPrice);
    cartItemDiv.append(removeItemButton);

    return cartItemDiv;
}

function cartTotalPrice() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalPrice = 0;

    console.log("Cart data in calculatedTotalPrice", cart);

    cart.forEach((item) => {
        totalPrice += item.price * item.quantity;
        console.log(`Item: ${item.title}, Quantity: ${item.quantity}, Total for item: ${item.price * item.quantity}`);
    });
    console.log("Calculated total price:", totalPrice);
    return totalPrice;
}

function cartContent() {
    const cartData = localStorage.getItem("cart");
    console.log("Cart data from localStorage:", cartData);

    const cart = JSON.parse(cartData) || [];
    const cartProductsDiv = document.querySelector("#cart-products");

    cartProductsDiv.innerHTML = "";

    if(cart.length === 0){
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "Your cart is currently empty";
        cartProductsDiv.appendChild(emptyCartMessage);
    } else {
        cart.forEach((item) => {
            const cartItemElement = createCartItemElement(item, removeFromCart);
            cartProductsDiv.appendChild(cartItemElement);
        });

        const totalPrice = cartTotalPrice();
        const totalPriceElement = document.createElement("p");
        totalPriceElement.textContent = `Total Price: NOK ${totalPrice.toFixed(2)}`;
        totalPriceElement.className = "total-price";

        cartProductsDiv.appendChild(totalPriceElement);     
    }
}

document.addEventListener("DOMContentLoaded", cartContent);

function removeFromCart(itemsToRemove) {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const updatedCart = cart.filter(
        (item) => item.id !== itemsToRemove.id || item.size !== itemsToRemove.size
    );

    localStorage.setItem("cart" ,JSON.stringify(updatedCart));
    cartContent();
}