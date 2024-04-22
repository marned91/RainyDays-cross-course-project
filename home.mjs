import { doFetch } from "./script/utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./script/common/constant.mjs";

console.log("Script loaded");
const myBasket = [];
var myBasketSize = 0;

const genderMen = "Male";
const genderWomen = "Female";

function generateRainydaysProductHtml(product) {
  const containerDiv = document.createElement("div");
  containerDiv.className = "product";
  containerDiv.textContent = product.title;
  containerDiv.textContent = product.description;
  //Pris
  const img = document.createElement("img");
  img.src = product.image;
  img.alt = product.title;
  img.className = "jacket_img";
  containerDiv.appendChild(img);


//   const productButton = document.createElement("button");
//   productButton.data = products;
//   productButton.innerHTML = "Add to cart";
//   productButton.onclick = function () {
//     myBasket.push(products);
//     myBasketSize = myBasket.length;
//     const basketCountContainer = document.querySelector("#basketCount");
//     basketCountContainer.textContent =
//       "Varekurv inneholder: " + myBasketSize + " varer";
//     console.log(myBasket);
//   };

//   containerDiv.append(productButton);
  return containerDiv;
}

async function displayRainydaysProducts(products, genderSelection) {
  const displayContainer = document.querySelector("#display-container");
  displayContainer.innerHTML = "";
  let filteredProducts = products;


  // console.log (displayContainer);
  // rainydaysProducts.forEach(function (rainsydaysProduct){
  //     const rainydaysHtml = generateRainydaysProductHtml(rainsydaysProduct);
  //     displayContainer.appendChild(rainydaysHtml);
  // });

    //Checking that products is not null to avoid null pointer expection 
  if (filteredProducts != undefined) {
    if (genderSelection === "Female" || genderSelection === "Male") {
        filteredProducts = products.filter(product => product.gender === genderSelection); 
    }
    //Funksjon
    filteredProducts.forEach((product) => {
        const rainydaysHtml = generateRainydaysProductHtml(product);
        displayContainer.appendChild(rainydaysHtml);
    });
  }
  // const basketCounter = document.createElement("div");
  // basketCounter.id = "basketCount";
  // basketCounter.textContent = "Cart contains: " + myBasketSize + " jackets";
  // displayContainer.appendChild(basketCounter);
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


