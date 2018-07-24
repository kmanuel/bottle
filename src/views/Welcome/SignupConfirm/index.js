import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});


class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            username: '',
            email: '',
            password: ''
        };

        this.signup = this.signup.bind(this);
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    // handleClickShowPassword = () => {
    //     this.setState(state => ({showPassword: !state.showPassword}));
    // };

    signup = () => {
        this.props.onSignup(this.state.username, this.state.email, this.state.password);
    };

    render() {
        const {classes} = this.props;


        return (
            <div className="login-form">
                <div className="inputs">
                    <TextField
                        id="login-form-username"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.username}
                        onChange={this.handleChange('username')}
                        placeholder="Username"
                        fullWidth
                        margin="normal"
                    />

                    <TextField
                        id="login-form-email"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={this.state.email}
                        onChange={this.handleChange('email')}
                        placeholder="email"
                        fullWidth
                        margin="normal"
                    />
                    <Input
                        id="adornment-password"
                        placeholder="Password"
                        fullWidth={true}
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="Toggle password visibility"
                                    onClick={this.handleClickShowPassword}
                                    onMouseDown={this.handleMouseDownPassword}
                                >
                                    {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                    />
                </div>
                <div className="buttons">
                        <Button
                            className={'login-form-button ' + classes.button}
                            variant="contained" color="primary"
                            onClick={this.signup}>>
                            Signup
                        </Button>
                </div>
            </div>
        );
    }
}

SignupForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignupForm);