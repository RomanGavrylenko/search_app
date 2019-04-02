import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SearchPerson from './container/search-pearson/search-pearson';
import SinglePerson from './container/single-person/single-person';





class App extends Component {

  /*componentWillUnmount(){
    localStorage.clear();
  }*/


  render() {
    return (
      <Router>
        <div className="App">
        
          <Switch>
          <Route exact path='/' component={SearchPerson} />
          <Route path='/:id' /*component={<SinglePerson  />}*/
              render={({match})=>{
                const {id} = match.params;
                return <SinglePerson id={id}/>
              }} />
          </Switch>
          
        </div>
      </Router>
    );
  }
}

export default App;
