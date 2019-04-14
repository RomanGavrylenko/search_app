import React from 'react';

const ItemCard = ({data:{name, url, id},  loadImage, selectPerson, newImage})=>{

    return(
       <li className='person__item' onClick={()=> selectPerson(url)}>
           <figure className='person__picture'>
            <img 
                className='person__img' 
                src={loadImage(url)} 
                alt='person' 
                onError = {(e)=> { e.target.src=newImage}}
            />
           </figure>
           <h3 className='person__name'>
                {name}(id:{id})
           </h3>
       </li>
    );
}

export default ItemCard;