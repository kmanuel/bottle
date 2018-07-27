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


class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showPassword: false,
            username: '',
            password: ''
        };

        this.onLogin = this.onLogin.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };

    onLogin = () => {
        this.props.onLogin(this.state.username, this.state.password);
    };

    onCancel = () => {
        this.props.onCancel();
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
                        variant="contained" color="primary"
                        onClick={this.onCancel}>
                        Cancel
                    </Button>
                    <Button
                        className={'login-form-button ' + classes.button}
                        variant="contained" color="primary"
                        onClick={this.onLogin}>
                        Login
                    </Button>

                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginForm);