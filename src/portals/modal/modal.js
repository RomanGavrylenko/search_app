import React from 'react';
import ReactDOM from 'react-dom';

export default function Modal({children, close}){
    return(
        ReactDOM.createPortal(
            <div className='modal__wrapper'>
                <div className='modal'>
                    {children}
                    <button className='modal__button' onClick={close}>
                        Ok
                    </button>
                </div>
            </div>, document.body
        )
    );
}