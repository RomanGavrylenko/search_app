export async function makeRequest(url, options={}){

    try{
        let response = await fetch(url, options);

        if(!response.ok){
            throw new Error ('Статус ошибки', response.status);
        }

        let data = await response.json();

        return data;
    } catch (e){
        console.log(e);
    }
}