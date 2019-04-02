import React from 'react';

export default function SearchForm({value, changeSearch}){
    return(
        <form name='search-form'>
            <input 
                className='search-form__input' 
                value={value}
                onChange={changeSearch}
                placeholder='Кого вы хотите найти?'/>
        </form>
    );
}