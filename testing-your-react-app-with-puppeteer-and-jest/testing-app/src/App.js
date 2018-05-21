import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
          <nav className='navbar' role='navigation'>
            <ul>
              <li className="nav-li"><a href="#">Batman</a></li>
              <li className="nav-li"><a href="#">Supermman</a></li>
              <li className="nav-li"><a href="#">Aquaman</a></li>
              <li className="nav-li"><a href="#">Wonder Woman</a></li>
            </ul>
          </nav>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
