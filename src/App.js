import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'
import Navbar from './containers/navbar/Navbar';
import Welcome from './views/welcome/Welcome';
import CollectedBottles from './views/collected-bottles/CollectedBottles';
import DroppedBottles from './views/dropped-bottles/DroppedBottles';
import BottleDetail from './views/bottledetail/BottleDetail';
import CreateBottle from './views/createbottle/CreateBottle';
import Overview from './views/overview/Overview';
import SignupConfirm from './views/signupconfirm/SignupConfirm';
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
                        <Route path="/overview" component={Overview}/>
                        <Route path="/dropped-bottles" component={DroppedBottles}/>
                        <Route path="/collected-bottles" component={CollectedBottles}/>
                        <Route path="/create/bottle" component={CreateBottle}/>
                        <Route path="/bottle/:id" component={BottleDetail}/>
                        <Route path="/signup-confirm" component={SignupConfirm}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

export default App;
