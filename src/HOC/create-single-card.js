import React, { Component } from 'react';
import Preloader from '../components/preloader/preloader';

export default function createSingleCard(Wrapped, API){
    return class extends Component {
        state = {
            single: null,
            loaded: false
        }
    
        componentDidMount(){
            API.getData(this.props.id)
                .then(single=>{
                    this.setState({
                        single,
                        loaded: true
                    })
                })
                .catch(e=>{
                    console.log(' Ошибка в компоненте createSingleCard',e, e.message)
                });
        }

        render(){

            if(!this.state.loaded){
                return <Preloader />;
            }
        
            const src = API.loadImage(this.state.single.url);

            return(
                <Wrapped 
                    {...this.props}
                    {...this.state} 
                    src = {src}
                    />
            );
        }
    }
}