import React from 'react';
import createSingleCard from '../HOC/create-single-card';
import SWAPI from '../services/sw-api';

const SW = new SWAPI();

const API = {
    getData : SW.getPearson,
    loadImage : SW.loadImage
}

function SinglePerson({src, single}){

    const {name, gender, height, hair_color ,eye_color} = single;

    return  <div className='single-person__wrapper'>
                <div className='single-person'>
                    <figure className='single-person__picture'>
                        <img src = {src} alt='icon' className='single-person__img'/>
                    </figure>
                    <div className='single-person__info'>
                        <h3 className='single-person__name'>Name: {name}</h3>
                        <p className='single-person__text'>Gender: {gender}</p>
                        <p className='single-person__text'>Height: {height} sm</p>
                        <p className='single-person__text'>Hair color: {hair_color}</p>
                        <p className='single-person__text'>Eye Color: {eye_color}</p>
                    </div>
                </div>
            </div>
}


export default createSingleCard( SinglePerson, API);