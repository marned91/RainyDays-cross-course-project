const loader = document.querySelector ("#loading");

function displayLoading (){
    loader.classList.add ("display");
    setTimeout (() => {
        loader.classList.remove("display");
    }, 5000);
}

function hideLoading () {
    loader.classList.remove("display");
}

export async function doFetch (url){
    try {
        console.log("Fetching from URL:", url);
        //Start loading spinner
        displayLoading();
        const response =  await fetch(url);
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