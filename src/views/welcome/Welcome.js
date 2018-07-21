import React from 'react';
import {Link} from 'react-router-dom';
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

const Welcome = (props) => {
    const {classes} = props;
    return (
        <div className="welcome">
            <div className="bottle-image welcome-image"></div>
            <div className="welcome-buttons">
                <Link to="/login">
                    <Button variant="contained" color="primary" className={classes.button}>
                        Login
                    </Button>
                </Link>
                <Button variant="contained" color="primary" className={classes.button}>
                    Signup
                </Button>
            </div>
        </div>
    )
};

Welcome.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Welcome);