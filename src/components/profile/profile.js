import React, { Component } from 'react';
import withContext from '../../HOC/with-contex';
import { UserConsumer } from '../../contex-api/auth';
import { Redirect } from 'react-router-dom'
import EditForm from '../edit-form/edit-form';

class Profile extends Component {

    //получить профиль при стандартной отрисовке
    renderProfile = () => {
        const { name, gender, height, hair_color ,eye_color} = this.props.value.user;

        return(
            <div className='single-person__wrapper'>
                <div className='single-person'>
                    <figure className='single-person__picture'>
                        <img src = {this.props.value.userImage} alt='icon' className='single-person__img'/>
                    </figure>
                    <div className='single-person__info'>
                        <h3 className='single-person__name'>Name: {name}</h3>
                        <p className='single-person__text'>Gender: {gender}</p>
                        <p className='single-person__text'>Height: {height} sm</p>
                        <p className='single-person__text'>Hair color: {hair_color}</p>
                        <p className='single-person__text'>Eye Color: {eye_color}</p>
                        <button className='profile__button' onClick={this.props.value.getEdit} >
                            Edit
                        </button>
                    </div>
                   
                </div>
            </div>
        );
    }

    //получить вид при редактировании профиля

    renderEdit = () => {
        
        return(
            <div className='single-person__wrapper'>
                <div className='single-person'>
                    <figure className='single-person__picture'>
                        <img src = {this.props.value.userImage} alt='icon' className='single-person__img'/>
                    </figure>
                    <EditForm 
                        user={this.props.value.user} 
                        saveEdit={this.props.value.saveEdit}
                    />
                </div>
            </div>
        );
    }

    render(){

        //если не залогинился, то перенаправить на страницу входа

        if(this.props.value.user === null) {
            return <Redirect to='/signin/' />
        }

        if( this.props.value.edit){
            return this.renderEdit()
        }

        return this.renderProfile();
        
    }
}

export default withContext(Profile, UserConsumer);