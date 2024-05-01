import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";
import { updateCartIcon } from "./utils/updateCartIcon.mjs";
import { alertUser } from "./utils/errorHandler.mjs";

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
    alertUser(error.message);
  }
}

async function renderProduct() {
  const productContainer = document.querySelector("#product-details");
  const sizeSelect = document.querySelector("#sizes");
  const addToCartContainer = document.querySelector("#purchase-button");

  if (!productContainer || !sizeSelect || !addToCartContainer) {
    alertUser("Page structure was incomplete, please reload the page");
    return;
  }

  productContainer.innerHTML= "";

  const product = await fetchProductDetails(productId);

  if(!product) {
    alertUser("The product data was unavailable, please relead the page");
    return;
  }

  const title = document.createElement("h2");
  title.textContent = product.title;
  title.className = "product-h2";

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "product-img";

  const productDetailsDiv = document.createElement("div");
  productDetailsDiv.className = "product-details-wrapper";

  const description = document.createElement("p");
  description.textContent = product.description;

  const color = document.createElement ("p");
  color.textContent = `Color: ${product.baseColor}`;

  const price = document.createElement("p");
  price.textContent = `NOK ${product.price}`;

  productContainer.appendChild(img);

  productDetailsDiv.appendChild(title);
  productDetailsDiv.appendChild(description);
  productDetailsDiv.appendChild(color);
  productDetailsDiv.appendChild(price);

  productDetailsDiv.appendChild(sizeSelect);
  productDetailsDiv.appendChild(addToCartContainer);


  productContainer.appendChild(productDetailsDiv);

  sizeSelect.innerHTML = "";

  if (product.sizes && product.sizes.length > 0) {
    product.sizes.forEach((size) => {
      const option = document.createElement("option");
      option.value = size;
      option.textContent = size;
      sizeSelect.appendChild(option);
    });
  } else {
    alertUser("Product sizes are not defined");
  }

  let selectedSize = sizeSelect.value;

  sizeSelect.addEventListener("change", (e) => {
    selectedSize = e.target.value;
  });

  const addToCartButton = document.createElement("button");
  addToCartButton.textContent = "Add to cart";
  addToCartButton.className = "second-button";

  addToCartButton.addEventListener("click", () => {
    addToCart(product, selectedSize);
    updateCartIcon();
  });

  addToCartContainer.appendChild(addToCartButton);

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

  alert(`You just added ${product.title} in size ${size} to your cart`);

  updateCartIcon();
}

renderProduct();
