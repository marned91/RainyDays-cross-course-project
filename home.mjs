import {doFetch} from "./script/utils/doFetch.mjs";
import { API_RAINYDAYS_PRODUCTS } from "./script/common/constant.mjs";

console.log ("Script loaded");
const myBasket = [];
var myBasketSize = 0;

const manDefiningTag = "mens";
const womanDefiningTag = "womens";

function generateRainydaysProductHtml (products){
    const containerDiv = document.createElement("div");
    containerDiv.className = "myUniqueId";
    containerDiv.textContent = products.title;
    containerDiv.textContent = products.description;
    const productButton = document.createElement("button");

    productButton.data = products;
    productButton.innerHTML = 'Add to cart';
    productButton.onclick = function()
{
    myBasket.push(products);
    myBasketSize = myBasket.length;
    const basketCountContainer = document.querySelector("#basketCount");
    basketCountContainer.textContent = "Varekurv inneholder: " + myBasketSize + " varer";
    console.log(myBasket);
}

containerDiv.append(productButton);
    return containerDiv;
}

async function displayRainydaysProducts(rainydaysProducts){
    const displayContainer = document.querySelector("#display-container");
    console.log (displayContainer);
    /*rainydaysProducts.forEach(function (rainsydaysProduct){
        const rainydaysHtml = generateRainydaysProductHtml(rainsydaysProduct);
        displayContainer.appendChild(rainydaysHtml);
    });*/
    if(rainydaysProducts != undefined){
        rainydaysProducts.forEach(element => {
            if(element.tags.includes(manDefiningTag)){
                const rainydaysHtml = generateRainydaysProductHtml(element);
                displayContainer.appendChild(rainydaysHtml);    
            }
            
        });
    }
    const basketCounter = document.createElement("div");
    basketCounter.id = "basketCount";
    basketCounter.textContent = "Cart contains: " + myBasketSize + " jackets";
    displayContainer.appendChild(basketCounter);
};

async function main (){
try {  
    const rainydaysProducts =  await doFetch (API_RAINYDAYS_PRODUCTS);
    displayRainydaysProducts(rainydaysProducts);

    rainydaysProducts.forEach(it => console.log("Beskrivelse: " + it.description + " også navn da: " + it.title));

    console.log(JSON.stringify(rainydaysProducts));
} catch (error) {
    console.log (error);
}
}

main ();