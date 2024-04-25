import { displayLoading, hideLoading} from "./loadingSpinner.mjs";

export async function doFetch (url){
    console.log("Attempting fetch from URL:", url);
    try {
        //Start loading spinner
        displayLoading(); 
        const response =  await fetch(url);
        console.log("Response status:", response.status);
        if (!response.ok){
            console.log("Fetch failed:", response.statusText); 
            throw new Error ("Oops, something went wrong");
        }
        const json =  await response.json();
        console.log("Fetch successful:", json);
        return json;
    } catch (error){
        console.log("Error during fetch:", error.message);
        alert(error.message);
        throw new Error(error);
    } finally {
        console.log('API call is done');
        hideLoading();
        //Turn loading spinner of
    }
}