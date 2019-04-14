import React, { Component } from 'react';
import SWAPI from '../../services/sw-api';
import ImageShow from '../../components/image-show/image-show';
import Preload from '../../components/preloader/preloader';
import planetImg from '../../images/planet.jpg';
import ErrorBoundry from '../../error-boundry/error-boundry';


export default class Home extends Component {

    SW = new SWAPI();

    interval = null;

    state = {
        person: null,
        planet: null,
        peopleCount: 88,
        planetCount: 30,
        loaded: false
    }

    componentDidMount(){
        this.runRandom(5000);
    }

    componentWillUnmount(){
        clearInterval(this.interval);
    }

    runRandom = (ms) => {
        this.interval = setInterval(() => {
            this.updateState();
        }, ms);
    }

    updateState = async () => {

        const { peopleCount, planetCount } = this.state;
        const { getPearson, getPlanet } = this.SW;
        
        let person = await this.getRandItem(getPearson, peopleCount);

        let planet = await this.getRandItem(getPlanet, planetCount);

        this.setState({
            planet, 
            person, 
            loaded: true
        })

    }

    getRandItem = async (getData, count)=> {
        let random = Math.floor(Math.random()*count+1);
        if(random === 17){
            random = 16;
        }
        let data = await getData(random)

        return data;
    }

    render(){
        const { person, planet, loaded } = this.state;
        if(!loaded) {
           return <Preload/>
        }

        return(
            <div className='home'>
                <h2 className='home__title'>Star war persons and planets</h2>
                <div className='home__section'>
                    <ErrorBoundry>
                    <div className='home__one'>
                        <ImageShow 
                            data={person} 
                            loadImage={this.SW.loadImage}
                            newImage = {planetImg}
                        />
                    </div>
                    </ErrorBoundry>
                    <ErrorBoundry>
                    <div className='home__two'>
                        <ImageShow 
                            data={planet} 
                            loadImage={this.SW.loadImage}
                            newImage = {planetImg}
                        />
                    </div>
                    </ErrorBoundry>
                </div>
            </div>
        );
    }
}