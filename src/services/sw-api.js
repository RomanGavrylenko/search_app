import {makeRequest} from './make-request';

export default class SWAPI {
    construcntor(){
        this.getAllPeople = this.getAllPeople.bind(this);
    }

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
   
    async *getAllPeople(type) {
        let link = type == 'people' ? this._CATEGORY.people : this._CATEGORY.planets
        //let link = this._CATEGORY.people;//'https://swapi.co/api/people/'

        while(link){
            let data = await makeRequest(link);
            console.log('-data', data)

            link = data.next;

            for(let item of data.results) { // (4) yield commits one by one, until the page ends
                console.log(item)
                yield item;
            }
        }
    }
    
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

    getPlanets = async (url)=> {
        
        //ссылка для загрузки начальных данных и доп. подгрузки людей
        let link  = url ? url : `${this._CATEGORY.planets}`;

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

    getPlanet = async (id)=>{
        const link = `${this._CATEGORY.planets}${id}/`

        try{
            let data = await makeRequest(link);
            return data
        } catch(e){
            console.log(e);
        }
    }

    //метод для получения ссылки на картинку для персонажа
    loadImage = (url) => {
        let id = this.getId(url);
        let cat = this.getICategory(url);
        
        return `${this._IMAGE_CATEGORY[cat]}${id}.jpg`
    }

    getId(url){
        let position = url.match(/\/(\d*)\/$/);
        let id = position[1];
        return id;
    }

    getICategory(url){
        let position = url.match(/\/(\D+?)\//gm); 
        return position[1].slice(1,-1)
    }

   
}