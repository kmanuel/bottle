import React, {Component} from 'react';
import {connect} from 'react-redux';
import {createBottle} from '../../actions';

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
        this.props.dispatch(createBottle(title, body, this.props.position, history));
    }

    render() {
        return <div>
            <h1>New Bottle</h1>
            title
            <input
                value={this.state.title}
                onChange={this.onTitleChange}
                type="text"/>
            body
            <input
                value={this.state.body}
                onChange={this.onBodyChange}
                type="text"/>
            <button>Cancel</button>
            <button onClick={this.onSave}>Save</button>
        </div>
    };
}

const mapStateToProps = (state) => {
    return {position: state.position};
};

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateBottle);