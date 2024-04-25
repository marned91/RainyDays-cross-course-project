import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";
import { updateCartIcon } from "./utils/updateCartIcon.mjs";
import { displayLoading, hideLoading } from "./utils/loadingSpinner.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
});

console.log("Script loaded");

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");

console.log("Product ID from URL:", productId);

async function fetchProductDetails(productId) {
  const productUrl = `${API_RAINYDAYS_PRODUCTS}/${productId}`;
  console.log("Product URL:", productUrl);
  const product = await doFetch(productUrl);
  return product;
}

async function renderProduct() {
  const product = await fetchProductDetails(productId);
  if (!product) {
    alert("Sorry, product data is undefined");
    return;
  }

  const productContainer = document.querySelector("#product-details");

  productContainer.innerHTML = "";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  const title = document.createElement("h2");
  title.textContent = product.title;

  const description = document.createElement("p");
  description.textContent = product.description;

  const color = document.createElement ("p");
  color.textContent = `Color: ${product.baseColor}`;

  const price = document.createElement("p");
  price.textContent = `NOK ${product.price}`;

  productContainer.appendChild(img);
  productContainer.appendChild(title);
  productContainer.appendChild(description);
  productContainer.appendChild(color);
  productContainer.appendChild(price);

  const sizeSelect = document.querySelector("#sizes");
  sizeSelect.innerHTML = "";

  if (product.sizes && product.sizes.length > 0) {
    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });
  } else {
    alert("Product sizes is not defined");
  }

  let selectedSize = sizeSelect.value;

  sizeSelect.addEventListener("change", (e) => {
    selectedSize = e.target.value;
    console.log("New selected size:", selectedSize);
  });

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to cart";

  addToCartButton.addEventListener("click", () => {
    addToCart(product, selectedSize);
    updateCartIcon();
  });

  productContainer.appendChild(addToCartButton);
}

renderProduct();

document.addEventListener(DOMContentLoaded, updateCartIcon);


function addToCart(product, size) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProduct = cart.find(
    (item) => item.id === product.id && item.size === size
  );

  const cartItem = {
    id: product.id,
    title: product.title,
    image: product.image,
    size:  size,
    color: product.baseColor,
    price: product.price,
    quantity: 1,
  };

  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push(cartItem);
  }

  localStorage.setItem("cart", JSON.stringify(cart));

  updateCartIcon();
}
