import React from 'react';
import createSearchBlock from '../HOC/create-search-block';
import SWAPI from '../services/sw-api';
import SearchForm from '../components/search-form/search-form';
import  planet from '../images/planet.jpg';

const SW = new SWAPI();

const API = {
    //getData : SW.getPlanets,
    getData : SW.getAllPeople.bind(SW),
    getId : SW.getId,
    getCategory : SW.getCategory,
    loadImage : SW.loadImage
}

function PlanetsCategoryList({search, changeSearch, nextLink, renderList, addData}){

    return (
            <div className='item'>
                <SearchForm 
                    value={search}
                    changeSearch = {changeSearch}/>
                <ul className='item__card'>
                    {renderList(planet)}
                </ul>
                { nextLink &&
                    <button 
                        onClick={addData}
                        className='item__button'>
                        show more
                    </button>
                }
            </div>
    );
}

export default createSearchBlock(PlanetsCategoryList, API, 'planets');
