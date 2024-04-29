import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";
import { updateCartIcon } from "./utils/updateCartIcon.mjs";

document.addEventListener("DOMContentLoaded", updateCartIcon);

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get("id");


async function fetchProductDetails(productId) {
  try {
    const productUrl = `${API_RAINYDAYS_PRODUCTS}/${productId}`;
    const product = await doFetch(productUrl);

    if(!product) {
      throw new Error("Product information is not defined");
    }
    return product;
  } catch (error) {
    alert("Ooops, failed to fetch product details.");
  }
}

async function renderProduct() {
  const productContainer = document.querySelector("#product-details");
  const sizeSelect = document.querySelector("#sizes");

  if (!productContainer || !sizeSelect) {
    alert("Page structure is incomplete. Please reload.");
    return;
  }

  productContainer.innerHTML= "";

  const product = await fetchProductDetails(productId);

  if(!product) {
    alert("The product data was unavailable, please try to relead the page");
    return;
  }

  sizeSelect.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = product.title;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;

  const description = document.createElement("p");
  description.textContent = product.description;

  const color = document.createElement ("p");
  color.textContent = `Color: ${product.baseColor}`;

  const price = document.createElement("p");
  price.textContent = `NOK ${product.price}`;

  productContainer.appendChild(title);
  productContainer.appendChild(img);
  productContainer.appendChild(description);
  productContainer.appendChild(color);
  productContainer.appendChild(price);

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
  });

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to cart";
  addToCartButton.className = "button";

  addToCartButton.addEventListener("click", () => {
    addToCart(product, selectedSize);
    updateCartIcon();
  });

  productContainer.appendChild(addToCartButton);
}


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

renderProduct();
