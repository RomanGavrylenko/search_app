import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Profile from './components/profile/profile';

import Header from './container/header/header';
import SignIn from './components/sign-in/sign-in';

import Auth from './contex-api/auth';
import PeopleCategory from './category-card-list/peopleCardList';
import SinglePerson from './single-card/people-single-card';

import PlanetsCategory from './category-card-list/planet-card-list';
import SinglePlanet from './single-card/planet-single-list';

import Home from './container/home/home';



class App extends Component {

  /*componentWillUnmount(){
    localStorage.clear();
  }*/


  render() {

    const menuItem = [
      {path: '/', name: 'home'},
      {path: '/planets/', name: 'planets'},
      {path: '/people/', name: 'people'},
      {path: '/profile', name: 'profile'},
      {path: '/signin/', name: 'sign in'}
    ]

    return (
      <Router>
        <Auth>
            <Header items={menuItem} />
           
            <Switch>
              <Route exact path='/' component={Home}/>
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
              <Route path='/profile' component={Profile} />      
              <Route path='/signin/' component={SignIn} />
            </Switch>
        </Auth>
      </Router>
    );
  }
}

export default App;
