import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


import Header from './container/header/header';
import SignIn from './components/sign-in/sign-in';

import Auth from './contex-api/auth';
import PeopleCategory from './category-card-list/peopleCardList';
import SinglePerson from './single-card/people-single-card';

import PlanetsCategory from './category-card-list/planet-card-list';
import SinglePlanet from './single-card/planet-single-list';



class App extends Component {

  /*componentWillUnmount(){
    localStorage.clear();
  }*/


  render() {
    return (
      <Router>
        <Auth>

            <Header />
           

            <Switch>
              <Route exact path='/planets/' component={PlanetsCategory} />
              <Route  path='/planets/:id' 
                      render={({match})=>{
                        const {id} = match.params;
                        return <SinglePlanet id={id}/>
                      }} />
              <Route exact path='/people/' component={PeopleCategory} />
              <Route  path='/people/:id' 
                      render={({match})=>{
                        const {id} = match.params;
                        return <SinglePerson id={id}/>
                      }} />
              {<Route path='/signin/' component={SignIn} />}
            </Switch>
            
        </Auth>
      </Router>
    );
  }
}

export default App;
