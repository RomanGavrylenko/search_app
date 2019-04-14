import React, { Component } from 'react';
import Preload from '../preloader/preloader';

export default class EditForm extends Component {
    state = {
        
    }

    componentDidMount(){
        this.setState({
           user: this.props.user
        })
    }

    onChange = (e) => {
        const target = e.currentTarget;
        const name = target.name;
        this.setState(state=>({
            user: {...state.user, [name]: target.value},
        }));
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.saveEdit(this.state.user)
    }

    render(){
        if(!this.state.user){
            return <Preload />
        }
        const { name, gender, height, hair_color ,eye_color } = this.state.user;

        return(
          <form className='form' onSubmit={this.onSubmit}>
                <Input type='text' label='Name' value={name} name='name' change = {this.onChange}/>
                <Input type='text' label='gender' value={gender} name='gender' change = {this.onChange}/>
                <Input type='text' label='height' value={height} name='height' change = {this.onChange}/>
                <Input type='text' label='hair_color' value={hair_color} name='hair_color' change = {this.onChange}/>
                <Input type='text' label='eye_color' value={eye_color} name='eye_color' change = {this.onChange}/>
                <button className='form__button' type='submit'>
                   Save
                </button>
          </form>  
        );
    }
}

const Input = ({type, label, value, name, change}) =>{
    return (
        <>
        <label className='form__label'> 
            {label}
        </label>
        <input
            className = 'form__input' 
            type = {type} 
            value = {value} 
            name = {name}
            onChange = {change} />
        </>
        
    );
}