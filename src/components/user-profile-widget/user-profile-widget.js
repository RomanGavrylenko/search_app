import React from 'react';
import SignOut from '../../svg-components/sign-out';

export default function UserProfileWidget({user, userImage, signOut}){

    if(user === null){
        return null;
    }

    return(
        <>
            <p className='header__profile-name'>
                {user.name}
            </p>
            <figure  className='header__profile-picture'>
                <img className='header__profile-img' src={userImage}/>
            </figure>
            <SignOut cls='header__profile-icon' onClick={signOut}/>
        </>
    );
}