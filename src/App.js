import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';
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
    constructor(props) {
        super(props);
    }

    render() {
        const {isAuthenticated} = this.props;
        return (
            <div className="App">
                <Router basename={'/bottle'}>
                    <div className="main">
                        <div className="nav">
                            <Navbar className="nav"/>
                        </div>
                        <div className="content">
                            <Route exact path="/" component={Welcome}/>
                            <PrivateRoute authenticated={isAuthenticated} path="/overview" component={Overview}/>
                            <PrivateRoute authenticated={isAuthenticated} path="/dropped-bottles" component={DroppedBottles}/>
                            <PrivateRoute authenticated={isAuthenticated} path="/collected-bottles" component={CollectedBottles}/>
                            <PrivateRoute authenticated={isAuthenticated} path="/create/bottle" component={CreateBottle}/>
                            <PrivateRoute authenticated={isAuthenticated} path="/bottle/:id" component={BottleDetail}/>
                            <Route path="/signup-confirm" component={SignupConfirm}/>
                        </div>
                    </div>
                </Router>
            </div>
        );
    }
}

const PrivateRoute = ({component, authenticated, ...rest}) => {
    if (true) {
        return <Route {...rest} component={component} />;
    } else {
        return <Redirect to='/'/>;
    }
};

const mapStateToProps = (state) => {
    return {isAuthenticated: state.auth && state.auth.user}
};

export default connect(mapStateToProps, undefined)(App);
