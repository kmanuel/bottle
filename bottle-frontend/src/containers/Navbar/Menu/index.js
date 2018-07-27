import React, {Component} from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import {Link} from 'react-router-dom';

class NavbarAccountMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null,
            open: false
        };
    }

    handleMenu = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    handleLogout = () => {
        this.handleClose();
        this.props.onLogout();
    };

    render() {
        const open = Boolean(this.state.anchorEl);

        return (
            <div>
                <IconButton
                    aria-owns={open ? 'menu-appbar' : null}
                    aria-haspopup="true"
                    onClick={this.handleMenu}
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <Menu
                    id="menu-appbar"
                    anchorEl={this.state.anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={() => this.handleLogout()}>
                            Logout
                    </MenuItem>
                </Menu>
            </div>
        );
    }

}

export default NavbarAccountMenu;
