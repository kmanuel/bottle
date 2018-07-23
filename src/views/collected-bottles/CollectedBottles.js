import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottleList from '../../components/bottlelist/BottleList';
import {loadBottles} from '../../actions';

class CollectedBottles extends Component {
    constructor(props) {
        super(props);
        props.loadBottles();
    }

    render() {
        return (
            <div className="collected-bottles">
                <h1>Collected Bottles</h1>
                <BottleList bottles={this.props.bottles} />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    bottles: state.bottles.collectedBottles
});

export default connect(mapStateToProps, {loadBottles})(CollectedBottles);