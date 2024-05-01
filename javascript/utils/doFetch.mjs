import { displayLoading, hideLoading } from "./loadingSpinner.mjs";
import { alertUser } from "./errorHandler.mjs";

export async function doFetch (url){
    const startTime = Date.now();
    try {
        displayLoading(); 
        const response =  await fetch(url);
        if (!response.ok){
            throw new Error ("Sorry, something went wrong, please reload the page");
        }
        const json =  await response.json();
        return json;
    } catch (error){
        alertUser(error.message);
        throw new Error(error);
    } finally {
            hideLoading();
    }
}