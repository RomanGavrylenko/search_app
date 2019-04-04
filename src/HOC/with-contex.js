import React from 'react';

export default function withContext(Wrapped, Consumer){
    return (props)=>{
        return(
            <Consumer>
                {(value)=>{
                   return  <Wrapped {...props} value={value} />
                }}
            </Consumer>
        );
    }
}