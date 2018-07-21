import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Welcome from './views/welcome/Welcome';
import Login from './views/login/Login';
import Overview from './views/overview/Overview';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route exact path="/" component={Welcome}/>
            <Route path="/login" component={Login}/>
            <Route path="/overview" component={Overview}/>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
