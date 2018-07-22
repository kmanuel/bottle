import React, {Component} from 'react';
import LoginForm from './loginform/LoginForm';
import SignupForm from './signupform/SignupForm';

import {connect} from 'react-redux';
import {login, signup} from '../../actions';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import './Welcome.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoginForm: false,
            showSignupForm: false
        };

        this.toggleLogin = this.toggleLogin.bind(this);
        this.toggleSignup = this.toggleSignup.bind(this);
    }

    toggleLogin() {
        this.setState((prevState) => {
            return {
                showLoginForm: !prevState.showLoginForm
            }
        });
    }

    toggleSignup() {
        this.setState((prevState) => {
            return {
                showSignupForm: !prevState.showSignupForm
            }
        });
    }

    render() {
        const {classes} = this.props;

        const loginForm = (this.state.showLoginForm)
            ? <div className="login-form-holder">
                <LoginForm history={this.props.history}
                           onLogin={(username, password) => this.props.dispatch(login(username, password, this.props.history))} />
            </div>
            : '';

        const signupForm = (this.state.showSignupForm)
            ? <div className="signup-form-holder">
                <SignupForm history={this.props.history}
                            onSignup={(username, email, password) => this.props.dispatch(signup(username, email, password, this.props.history))} />
            </div>
            : '';

        const buttons = (!this.state.showLoginForm && !this.state.showSignupForm)
            ? <div className="welcome-buttons">
                <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleLogin}>
                    Login
                </Button>
                <Button variant="contained" color="primary" className={classes.button} onClick={this.toggleSignup}>
                    Signup
                </Button>
            </div>
            : '';


        return (
            <div className="welcome">
                <div className="bottle-image welcome-image"></div>

                {loginForm}
                {signupForm}

                {buttons}

            </div>
        )
    }
}

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Welcome));