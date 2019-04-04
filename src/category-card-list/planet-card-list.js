import React from 'react';
import createSearchBlock from '../HOC/create-search-block';
import SWAPI from '../services/sw-api';
import SearchForm from '../components/search-form/search-form';

const SW = new SWAPI();

const API = {
    getData : SW.getPlanets,
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
                    {renderList()}
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
