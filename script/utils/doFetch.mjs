import { displayLoading, hideLoading} from "./loadingSpinner.mjs";

const min_display_time = 1000;
export async function doFetch (url){
    console.log("Attempting fetch from URL:", url);
    const startTime = Date.now();
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
        const duration = Date.now() - startTime;
        const remainingTime = min_display_time - duration;
        if (remainingTime > 0) {
            setTimeout(hideLoading,remainingTime);
        } else {
            hideLoading();
            //Turn loading spinner of
        }
        console.log('API call is done');
    }
}