import React, {Component} from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect
} from 'react-router-dom'
import {connect} from 'react-redux';
import Navbar from './containers/Navbar/index';
import Welcome from './views/Welcome';
import BottleDetail from './views/BottleDetail';
import CreateBottle from './views/CreateBottle';
import CollectedBottles from './views/CollectedBottles';
import Overview from './views/Overview';
import SignupConfirm from './views/SignupConfirm';
import './App.css';
import CssBaseline from '@material-ui/core/CssBaseline';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#ffcd38'
        },
        secondary: {
            main: '#f44336',
        },
    },
});

class App extends Component {
    render() {
        const {isAuthenticated} = this.props;
        return (
            <React.Fragment>
                <MuiThemeProvider theme={theme}>
                    <CssBaseline />
                    <div className="App">
                        <Router basename={'/bottle'}>
                            <div className="main">
                                <div className="nav">
                                    <Navbar className="nav"/>
                                </div>
                                <div className="content">
                                    <Route exact path="/" component={Welcome}/>
                                    <PrivateRoute authenticated={isAuthenticated} path="/overview"
                                                  component={Overview}/>
                                    <PrivateRoute authenticated={isAuthenticated} path="/create/bottle"
                                                  component={CreateBottle}/>
                                    <PrivateRoute authenticated={isAuthenticated} path="/bottle/:id"
                                                  component={BottleDetail}/>
                                    <PrivateRoute authenticated={isAuthenticated} path="/collected-bottles"
                                                  component={CollectedBottles}/>
                                    <Route path="/signup-confirm" component={SignupConfirm}/>
                                </div>
                            </div>
                        </Router>
                    </div>
                </MuiThemeProvider>
            </React.Fragment>
        );
    }
}

const PrivateRoute = ({component, authenticated, ...rest}) => {
    if (authenticated) {
        return <Route {...rest} component={component}/>;
    } else {
        return <Redirect to='/'/>;
    }
};

const mapStateToProps = (state) => {
    return {isAuthenticated: state.auth && state.auth.user}
};

export default connect(mapStateToProps, undefined)(App);
