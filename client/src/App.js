import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';
// import BeerList from "./components/BeerList";
import NavBar from './components/NavBar';
// import Favourites from "./components/Favourites";
// import Add from "./components/Add";

class App extends Component {

  render() {
    return (

      <Router>

        <div className="App">
          <NavBar />

          {/* <Route exact path="/" component={BeerList} /> */}
          {/* <Route path="/favourites" component={Favourites} />
          <Route path="/add" component={Add} /> */}

        </div>
      </Router>
    );
  }
}

export default App;
