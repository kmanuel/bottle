import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import './Login.css';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            showPassword: false
        };
    }

    handleChange = prop => event => {
        this.setState({[prop]: event.target.value});
    };

    handleClickShowPassword = () => {
        this.setState(state => ({showPassword: !state.showPassword}));
    };


    render() {
        const {classes} = this.props;
        return (
            <div className="login">
                <div className="bottle-image login-image"></div>
                <div className="login-form">
                    <div className="inputs">
                        <TextField
                            id="login-form-username"
                            InputLabelProps={{
                                shrink: true,
                            }}
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
                        <Link to="/overview">
                            <Button
                                className={'login-form-button ' + classes.button}
                                variant="contained" color="primary">
                                Login
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);