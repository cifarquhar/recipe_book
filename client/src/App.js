import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import Home from "./components/Home";
import RecipeList from './components/RecipeList';
// import Favourites from "./components/Favourites";
// import Add from "./components/Add";

class App extends Component {

  render() {
    return (

      <Router>

        <div className="App">
          <NavBar />

          <Route exact path="/" component={Home} />
          <Route path="/recipes" component={RecipeList} />
          {/* <Route path="/add" component={Add} /> */}

        </div>
      </Router>
    );
  }
}

export default App;
