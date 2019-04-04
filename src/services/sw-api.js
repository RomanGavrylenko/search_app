import {makeRequest} from './make-request';

export default class SWAPI {

    //const for get data about person, planets and other 

    _BASE_URL = 'https://swapi.co/api/';

    _CATEGORY={
        people: `${this._BASE_URL}people/`,
        films : `${this._BASE_URL}films/`,
        planets : `${this._BASE_URL}planets/`,
        species : `${this._BASE_URL}species/`,
        starships : `${this._BASE_URL}starships/`,
        vehicles : `${this._BASE_URL}vehicles/`
    }

    //const for get image for person and other

    _BASE_IMAGE_URL = 'https://starwars-visualguide.com/assets/img/';

    _IMAGE_CATEGORY={
        people: `${this._BASE_IMAGE_URL}characters/`,
        films : `${this._BASE_IMAGE_URL}films/`,
        planets : `${this._BASE_IMAGE_URL}planets/`,
        species : `${this._BASE_IMAGE_URL}species/`,
        starships : `${this._BASE_IMAGE_URL}starships/`,
        vehicles : `${this._BASE_IMAGE_URL}vehicles/`
    }

    // get data of people
   
    
    getPeople = async (url)=> {
        
        //ссылка для загрузки начальных данных и доп. подгрузки людей
        let link  = url ? url : `${this._CATEGORY.people}`;

        try{
            let data = await makeRequest(link);
            return data
        } catch(e){
            console.log(e.message);
        }
    }

    //метод для получения данных о конкретном персонаже

    getPearson = async (id)=>{
        const link = `${this._CATEGORY.people}${id}/`

        try{
            let data = await makeRequest(link);
            return data
        } catch(e){
            console.log(e);
        }
    }

    //метод для получения ссылки на картинку для персонажа
    loadPersonImage = (url) => {
        let id = this.getId(url);
        return `${this._IMAGE_CATEGORY.people}${id}.jpg`
    }

    getId(url){
        let position = url.match(/\/(\d*)\/$/);
        let id = position[1];
        return id;
    }
}