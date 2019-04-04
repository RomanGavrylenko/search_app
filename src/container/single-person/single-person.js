import React, {Component} from 'react';
import SWAPI from '../../services/sw-api'

export default class SinglePerson extends Component {

    SW = new SWAPI();

    state = {
        person: null,
        
    }

    componentDidMount(){
        this.SW.getPearson(this.props.id)
            .then(person=>{
                this.setState({
                    person
                })
            })
            .catch(e=>console.log(e));
    }
    

    render(){
        if(!this.state.person){
            return null;
        }
        const { name, url, eye_color, gender, height, hair_color } = this.state.person;

        const src = this.SW.loadImage(url);

        console.log(this.props)

        return(
            <div className='single-person__wrapper'>
                <div className='single-person'>
                    <figure className='single-person__picture'>
                        <img src = {src} alt='icon' className='single-person__img'/>
                    </figure>
                    <div className='single-person__info'>
                        <h3 className='single-person__name'>Name: {name}</h3>
                        <p className='single-person__text'>Gender: {gender}</p>
                        <p className='single-person__text'>Height: {height} sm</p>
                        <p className='single-person__text'>Hair color: {hair_color}</p>
                        <p className='single-person__text'>Eye Color: {eye_color}</p>
                    </div>
                </div>
            </div>
        );
    }
}
