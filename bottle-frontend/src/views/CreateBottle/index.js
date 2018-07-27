import React, {Component} from 'react';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {createBottle} from '../../actions';
import './CreateBottle.css';

class CreateBottle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onBodyChange = this.onBodyChange.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    onTitleChange(evt) {
        this.setState({
            title: evt.target.value
        });
    }

    onBodyChange(evt) {
        this.setState({
            body: evt.target.value
        });
    }

    onSave() {
        const {title, body} = this.state;
        const {history} = this.props;
        this.props.createBottle(title, body, this.props.position, this.props.username, history);
    }

    render() {
        return <div className="create-bottle">
            <div className="create-bottle-main">
                <h1>New Bottle</h1>
                <TextField
                    id="title"
                    label="Title"
                    value={this.state.title}
                    onChange={this.onTitleChange}
                    margin="normal"
                />
                <TextField
                    id="body"
                    label="Body"
                    value={this.state.body}
                    onChange={this.onBodyChange}
                    margin="normal"
                    placeholder="Message"
                    multiline
                />
            </div>
            <div className="btn-group-horizontal">
                <Button
                    variant="contained" color="primary"
                    onClick={() => this.props.history.goBack()}>
                    Cancel
                </Button>
                <Button
                    variant="contained" color="primary"
                    onClick={this.onSave}>
                    Save
                </Button>
            </div>
        </div>
    };
}

const mapStateToProps = (state) => {
    console.log(state.auth);
    return {position: state.position, username: state.auth.user.username};
};

export default connect(mapStateToProps, {createBottle})(CreateBottle);