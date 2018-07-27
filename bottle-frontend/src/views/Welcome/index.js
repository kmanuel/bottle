import React, {Component} from 'react';

import {connect} from 'react-redux';
import {login, signup, autoLogin} from '../../actions';

import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';

import LoginForm from './LoginForm';
import SignupForm from './SignupConfirm';

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

        props.autoLogin();

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
                           onLogin={(username, password) => this.props.login(username, password, this.props.history)}
                           onCancel={this.toggleLogin} />
            </div>
            : '';

        const signupForm = (this.state.showSignupForm)
            ? <div className="signup-form-holder">
                <SignupForm history={this.props.history}
                            onSignup={(username, email, password) => this.props.signup(username, email, password, this.props.history)}
                            onCancel={this.toggleSignup} />
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

        const {auth} = this.props;
        const loggedIn = auth && (auth.user !== undefined);

        if (loggedIn) {
            this.props.history.push('/overview');
        }

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

const mapStateToProps = ({auth}) => {
    console.log(auth);
    return {auth};
};

export default connect(mapStateToProps, {login, signup, autoLogin})(withStyles(styles)(Welcome));