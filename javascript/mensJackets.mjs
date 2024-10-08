import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";
import { alertUser } from "./utils/errorHandler.mjs";
import { updateCartIcon } from "./utils/updateCartIcon.mjs";
import { displayLoading, hideLoading } from "./utils/loadingSpinner.mjs";

document.addEventListener("DOMContentLoaded", () => {
  updateCartIcon();
  main();
});

function generateMensProducts(product) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "mens-product";

  const productLink = document.createElement("a");
  productLink.href = `../product/index.html?id=${product.id}`;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "mens-jacket-img";
  productLink.appendChild(img);

  const productTitle = document.createElement("p");
  productTitle.textContent = product.title;
  productTitle.className = "mens-title";

  const productPrice = document.createElement("p");
  productPrice.textContent = `NOK ${product.price}`;

  containerDiv.appendChild(productLink);
  containerDiv.appendChild(productTitle);
  containerDiv.appendChild(productPrice);

  return(containerDiv);
}

async function displayMensProducts(products) {
  const mensWrapper = document.querySelector("#mens-wrapper");
  mensWrapper.innerHTML = "";

  const mensProducts = products.filter(product => product.gender === "Male");

  if(mensProducts.length > 0) {
    mensProducts.forEach(product => {
      const mensProductHtml = generateMensProducts(product);
      mensWrapper.appendChild(mensProductHtml);
    });
  } else {
    alertUser("Sorry, we could not find any men's jackets. Please reload the page.");
  }
}

async function main() {
  try {
    const rainydaysProducts = await doFetch(API_RAINYDAYS_PRODUCTS);
    console.log("API response:", rainydaysProducts);
    displayMensProducts(rainydaysProducts);
  } catch (error) {
    alertUser("An error occurred while loading the products, please reload the page.");
  }
}
