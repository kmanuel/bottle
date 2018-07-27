import React from 'react';
import { connect } from 'react-redux';

import { fetchCollectedBottles } from '../../actions';

import BottleList from '../../components/BottleList';

class CollectedBottles extends React.Component {
    constructor(props) {
        super(props);
        props.fetchCollectedBottles();
    }

    render() {
        return <BottleList bottles={this.props.bottles} />;
    }
}

const mapStateToProps = (state) => {
    return {
        bottles: state.bottles.collectedBottles
    };
};

export default connect(mapStateToProps, {fetchCollectedBottles})(CollectedBottles);