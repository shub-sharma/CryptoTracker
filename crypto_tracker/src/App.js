import React, { Component } from 'react'
import './App.css';
import SearchBar from './SearchBar.js'
export default class App extends Component {

  render() {
    return (
      <div>
        <h3 className="center">CryptoTracker - Track Your Crypto Assets</h3>
        <SearchBar />

      </div>
    )
  }
}

