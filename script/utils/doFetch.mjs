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
        //Start loading spinner
        displayLoading();
        const response =  await fetch(url);
        const json =  await response.json();
        return json;
    } catch (error){
        console.log (error);
        throw new Error(error);
    } finally {
        console.log('API call is done');
        hideLoading();
        //Turn loading spinner of
    }
}