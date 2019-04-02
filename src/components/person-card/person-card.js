import React from 'react';

const ItemCard = ({data:{name, url},  loadImage, selectPerson})=>{

    return(
       <li className='person__item' onClick={()=> selectPerson(url)}>
           <figure className='person__picture'>
               <img className='person__img' src={loadImage(url)} alt='person'/>
           </figure>
           <h3 className='person__name'>
                {name}
           </h3>
       </li>
    );
}

export default ItemCard;