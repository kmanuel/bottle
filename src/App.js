import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Navbar from './components/navbar/Navbar';
import Welcome from './views/welcome/Welcome';
import Login from './views/login/Login';
import CollectedBottles from './views/collected-bottles/CollectedBottles';
import DroppedBottles from './views/dropped-bottles/DroppedBottles';
import BottleDetail from './views/bottledetail/BottleDetail';
import Overview from './views/overview/Overview';
import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Router>
                    <div className="main">
                        <div className="nav">
                            <Navbar className="nav"/>
                        </div>
                        <div className="content">
                        <Route exact path="/" component={Welcome}/>
                        <Route path="/login" component={Login}/>
                        <Route path="/overview" component={Overview}/>
                        <Route path="/dropped-bottles" component={DroppedBottles}/>
                        <Route path="/collected-bottles" component={CollectedBottles}/>
                        <Route path="/bottle/:id" component={BottleDetail}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
