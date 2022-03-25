
import React from "react";

import Home from "./components/Home";

import NewBook from "./components/NewBook";


import UpdateBook from "./components/Update"; 

import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom"

export default () => {
  

  return (

    <Router>
        
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/new"><NewBook /></Route>
        <Route exact path="/update/:bookId"><UpdateBook/></Route>
  
      </Switch>
     
    </Router>)
}