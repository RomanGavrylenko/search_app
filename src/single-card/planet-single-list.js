import React from 'react';
import createSingleCard from '../HOC/create-single-card';
import SWAPI from '../services/sw-api';

const SW = new SWAPI();

const API = {
    getData : SW.getPlanet,
    loadImage : SW.loadImage
}

function SinglePlanet({src, single}){

    const {name, diameter, orbital_period, terrain, population } = single;

    return  <div className='single-person__wrapper'>
                <div className='single-person'>
                    <figure className='single-person__picture'>
                        <img src = {src} alt='icon' className='single-person__img'/>
                    </figure>
                    <div className='single-person__info'>
                        <h3 className='single-person__name'>Name: {name}</h3>
                        <p className='single-person__text'>Diameter: {diameter} km</p>
                        <p className='single-person__text'>Year: {orbital_period} days</p>
                        <p className='single-person__text'>Surface: {terrain}</p>
                        <p className='single-person__text'>Population: {population}</p>
                    </div>
                </div>
            </div>
}


export default createSingleCard( SinglePlanet, API);