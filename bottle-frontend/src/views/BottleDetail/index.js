import React, { Component } from 'react';
import { collectBottle } from '../../actions';
import { connect } from 'react-redux';
import BottleInfo from '../../components/BottleInfo';
import Button from '@material-ui/core/Button';
import './BottleDetail.css';

const BottleDetail = (props) => {

    const takeButton = <Button
        variant="contained" color="primary"
        onClick={() => props.collectBottle(props.bottle.id)}>
        Take
    </Button>;

    const backButton = <Button
        variant="contained" color="primary"
        onClick={() => {
            props.history.goBack()
        }}>
        Leave
    </Button>;

    function bottleCollected() {
        return props.bottle.collectedBy;
    }

    if (props.bottle) {
        return (
            <div>
                <BottleInfo bottle={props.bottle}/>
                <div className="detail-buttons">
                    {!bottleCollected()
                        && takeButton}
                    {backButton}
                </div>
            </div>
        );
    } else {
        return <div>
            Unknown bottle
            {backButton}
        </div>
    }
};

const mapStateToProps = (state, prevProps) => {
    return {
        bottle: state.bottles.all.filter(b => b.id === prevProps.match.params.id)[0]
    };
};

export default connect(mapStateToProps, {collectBottle})(BottleDetail);