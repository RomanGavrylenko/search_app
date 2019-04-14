import React from 'react';
import createSearchBlock from '../HOC/create-search-block';
import SWAPI from '../services/sw-api';
import SearchForm from '../components/search-form/search-form';
import man from '../images/man-laptop-v1.svg'

const SW = new SWAPI();

const API = {
    getData : SW.getAllPeople.bind(SW, 'people'),
    getId : SW.getId,
    getCategory : SW.getCategory,
    loadImage : SW.loadImage
}

function PeopleCategoryList({search, changeSearch, nextLink, renderList, addData}){
    return (
            <div className='item'>
                <SearchForm 
                    value={search}
                    changeSearch = {changeSearch}/>
                <ul className='item__card'>
                    {renderList(man)}
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

export default createSearchBlock(PeopleCategoryList, API, 'people');

