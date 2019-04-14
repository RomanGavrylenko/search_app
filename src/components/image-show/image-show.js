import React from 'react';

const ImageShow = ({data:{name, url, ...other},  loadImage,newImage})=>{
    return(
       <div className='show-image' >
           <figure className='show-image__picture'>
               <img 
                    className='show-image__img' 
                    src={loadImage(url)} 
                    alt='show block' 
                    onError = {(e)=> { e.target.src=newImage}}/>
           </figure>
           <h3 className='show-image__name'>
                {name || 'some name'}
           </h3>
       </div>
    );
}

export default ImageShow;