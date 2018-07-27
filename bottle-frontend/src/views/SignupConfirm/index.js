import React, { Component } from 'react';
import {connect} from 'react-redux';
import {confirm} from '../../actions';
import './SignupConfirm.css';

class SignupConfirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            code: '',
            username: ''
        };

        this.onConfirm = this.onConfirm.bind(this);
    }

    changeUsername(evt) {
        this.setState({
            username: evt.target.value
        });
    }

    changeCode(evt) {
        this.setState({
            code: evt.target.value
        });
    }

    onConfirm() {
        const {username, code} = this.state;
        this.props.confirm(username, code, this.props.history);
    }

    render() {
        return <div className="signup-confirm">
            ConfirmationCode
            <input value={this.state.username} onChange={(evt) => this.changeUsername(evt)} />
            <input value={this.state.code} onChange={(evt) => this.changeCode(evt)} />
            <button
                onClick={this.onConfirm}>
                Confirm
            </button>
        </div>
    }

}

export default connect(() => {}, {confirm})(SignupConfirm);