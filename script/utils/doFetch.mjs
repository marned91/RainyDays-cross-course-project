export async function doFetch (url){
    try {
        //Start loading spinner
        const response =  await fetch(url);
        const json =  await response.json();
        return json;
    } catch (error){
        console.log (error);
        throw new Error(error);
    } finally {
        console.log('API call is done');
        //Turn loading spinner of
    }
}