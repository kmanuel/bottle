import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';
import Navbar from './containers/Navbar/index';
import Welcome from './views/Welcome';
import CollectedBottles from './views/CollectedBottles';
import DroppedBottles from './views/DroppedBottles';
import BottleDetail from './views/BottleDetail';
import CreateBottle from './views/CreateBottle';
import Overview from './views/Overview';
import SignupConfirm from './views/SignupConfirm';
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
    if (authenticated) {
        return <Route {...rest} component={component} />;
    } else {
        return <Redirect to='/'/>;
    }
};

const mapStateToProps = (state) => {
    return {isAuthenticated: state.auth && state.auth.user}
};

export default connect(mapStateToProps, undefined)(App);
