import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';

import { connect } from 'react-redux';
import { logout } from '../../actions';

import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Map from '@material-ui/icons/Map';
import ListItem from  '@material-ui/core/ListItem';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';

import NavbarAccountMenu from './Menu/index';

import './Navbar.css';

const styles = {
    root: {
        flexGrow: 1,
    },
    flex: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            anchor: 'left',
        };
    }

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    toggleOpen = () => {
        this.setState(prevState => {
            return {
                open: !prevState.open
            }
        });
    }

    render() {

        const authenticated = (this.props.auth.user) ? true : false;

        const {classes} = this.props;
        const drawer = (
            <Drawer
                className="left-drawer"
                variant="persistent"
                classes={{
                    paper: classes.drawerPaper,
                }}
                open={this.state.open}
                onClick={() => this.toggleOpen()}>
                <div className={classes.drawerHeader}>
                    <IconButton>
                        {<ChevronLeftIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List className="the-list">
                    <Link to="/overview">
                        <ListItem button>
                            <Map />Overview
                        </ListItem>
                    </Link>
                    <Divider />
                    <Link to="/collected-bottles">
                        <ListItem button>
                            <ShoppingBasket/>Collected Bottles
                        </ListItem>
                    </Link>
                </List>
                <Divider />
            </Drawer>
        );

        const auth = this.props.auth;

        if (authenticated) {
            return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton className={classes.menuButton} color="inherit" aria-label="Menu"
                                        onClick={this.handleDrawerOpen}>
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="title" color="inherit" className={classes.flex}>
                                {auth.user.username}
                            </Typography>
                            <NavbarAccountMenu history={this.props.history} onLogout={() => this.props.dispatch(logout(this.props.history))}/>
                        </Toolbar>
                    </AppBar>
                    {drawer}
                </div>
            );
        } else {
            return (
                <div className={classes.root}>
                    <AppBar position="static">
                        <Toolbar>
                        </Toolbar>
                    </AppBar>
                </div>
            );
        }
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    const {auth} = state;
    return {auth};
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navbar)));