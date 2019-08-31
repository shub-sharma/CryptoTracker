import React, { Component } from 'react'
import './App.css';
import SearchBar from './SearchBar.js'

import Navbar from './components/Navbar'
import Home from './components/Home';
import { BrowserRouter, Route } from 'react-router-dom'
import Portfolio from './components/Portfolio'


export default class App extends Component {

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/portfolio" component={Portfolio} />
        </div>
      </BrowserRouter>
    )
  }
}

