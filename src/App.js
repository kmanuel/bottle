import React, { Component } from 'react';
import Navbar from './components/navbar/Navbar';
import Login from './views/welcome/Welcome';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <Login />
      </div>
    );
  }
}

export default App;
