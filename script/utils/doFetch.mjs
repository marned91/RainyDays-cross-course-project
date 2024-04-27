import { displayLoading, hideLoading} from "./loadingSpinner.mjs";

const min_display_time = 1000;
export async function doFetch (url){
    const startTime = Date.now();
    try {
        //Start loading spinner
        displayLoading(); 
        const response =  await fetch(url);
        if (!response.ok){
            throw new Error ("Oops, something went wrong");
        }
        const json =  await response.json();
        return json;
    } catch (error){
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