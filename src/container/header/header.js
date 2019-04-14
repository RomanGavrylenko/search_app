import React from 'react';
import {Link} from 'react-router-dom';
import UserProfileWidget from '../../components/user-profile-widget/user-profile-widget';
import withContext from '../../HOC/with-contex';
import { UserConsumer } from '../../contex-api/auth';

function Header({value, items}){

    //create menu section
    const menu = items.map(item=>{
        return (
            <li className='header__menu-item'>
                <Link 
                    className='header__menu-link' 
                    to={item.path}
                >
                    {item.name}
                </Link>
            </li>
        );
    })

    return(
        <header className='header'>
            <ul className='header__menu'>
               {menu}
            </ul>
            <div className='header__profile'>
                <UserProfileWidget 
                    user={value.user} 
                    userImage={value.userImage}
                    signOut={value.getSignOut}/>
            </div>
        </header>
    );
}

export default withContext(Header, UserConsumer);