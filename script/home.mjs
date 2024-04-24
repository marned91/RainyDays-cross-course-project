import { doFetch } from "./utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./constant.mjs";

console.log("Script loaded");


function scrollDownButton (){
  const targetSection = document.querySelector(".all-jackets");
  if(targetSection){
    targetSection.scrollIntoView({behavior: "smooth"});
  } else {
    alert("Sorry, we could not find this page right now");
  }
}

document.addEventListener ("DOMContentLoaded", () => {
  const shopNowButton = document.querySelector("#shop-now");
  if(shopNowButton){
    shopNowButton.addEventListener("click", (event) => {
      event.preventDefault();
      scrollDownButton();
    });
  } else {
    alert("Sorry, something went wrong!");
  }
});


const genderMen = "Male";
const genderWomen = "Female";

function generateRainydaysProductHtml(product) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "product";
  const productLink = document.createElement ("a");
  productLink.href = `./product/index.html?id=${product.id}`;

  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "jacket_img";
  productLink.appendChild(img);
  containerDiv.appendChild(productLink);

  const productTitle = document.createElement("p");
  productTitle.textContent = product.title;
  productTitle.className = "product-title";

  const productDescription = document.createElement ("p");
  productDescription.textContent = product.description;
  productDescription.className = "product-description";

  const productPrice = document.createElement("p");
  productPrice.textContent = `NOK ${product.price}`;
  productPrice.className = "product-price";

  containerDiv.appendChild(productTitle);
  containerDiv.appendChild(productDescription);
  containerDiv.appendChild(productPrice);

  return containerDiv;
}

async function displayRainydaysProducts(products, genderSelection) {
  const displayContainer = document.querySelector("#display-container");
  displayContainer.innerHTML = "";
  let filteredProducts = products;


    //Checking that products is not null to avoid null pointer expection 
  if (filteredProducts != undefined) {
    if (genderSelection === "Female" || genderSelection === "Male") {
        filteredProducts = products.filter(product => product.gender === genderSelection); 
    }
    //This is a function
    filteredProducts.forEach((product) => {
        const rainydaysHtml = generateRainydaysProductHtml(product);
        displayContainer.appendChild(rainydaysHtml);
    });
  } else {
    alert ("Sorry, something went wrong");
  }
}

async function main() {
  try {
    const rainydaysProducts = await doFetch(API_RAINYDAYS_PRODUCTS);
    displayRainydaysProducts(rainydaysProducts);

    const select = document.querySelector("#gender");
    select.addEventListener("change", function(){
        console.log("Inside event listener", select.value);
        displayRainydaysProducts(rainydaysProducts, select.value);

    })

  } catch (error) {
    console.log(error);
  }
}
  
  main();


