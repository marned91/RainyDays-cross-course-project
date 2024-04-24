import { doFetch } from "./utils/doFetch.mjs";

function createCartItemElement(item){
    const cartItemDiv = document.createElement("div");
    cartItemDiv.className = "cart-item";

    const productTitle = document.createElement ("h3");
    productTitle.textContent = `Jacket: ${item.title}`;

    const img = document.createElement("img");
    img.src = item.image;
    img.alt = item.title;
    img.className = "item_img";

    const productSize = document.createElement ("p");
    productSize.textContent = `Size: ${item.size}`;

    const productQuantity = document.createElement ("p");
    productQuantity.textContent = `Quantity: ${item.quantity}`;

    const productTotalPrice = item.quantity * item.price;
    const productPrice = document.createElement ("p");
    productPrice.textContent = `Total price: NOK ${productTotalPrice.toFixed(2)}`;

    cartItemDiv.append(productTitle);
    cartItemDiv.append(img);
    cartItemDiv.append(productSize);
    cartItemDiv.append(productQuantity);
    cartItemDiv.append(productPrice);

    return cartItemDiv;
}

function displayCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartProductsDiv = document.querySelector("#cart-products");

    cartProductsDiv.innerHTML = "";

    if(cart.length === 0){
        const emptyCartMessage = document.createElement("p");
        emptyCartMessage.textContent = "Your cart is currently empty";
        cartProductsDiv.appendChild(emptyCartMessage);
    } else {
        cart.forEach((item) => {
            const cartItemElement = createCartItemElement(item);
            cartProductsDiv.appendChild(cartItemElement);
        });
    }
}

document.addEventListener("DOMContentLoaded", displayCart);