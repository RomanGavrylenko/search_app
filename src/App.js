import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPerson from './container/search-pearson/search-pearson';
import SinglePerson from './container/single-person/single-person';
import Header from './container/header/header';
import SignIn from './components/sign-in/sign-in';

import Auth from './contex-api/auth';





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
              <Route exact path='/people/' component={SearchPerson} />
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
