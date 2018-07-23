import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottleInfo from '../../components/bottleinfo/Bottleinfo';
import Button from '@material-ui/core/Button';
import './BottleDetail.css';
import { collectBottle } from '../../actions';


const BottleDetail = (props) => {

    const onTakeBottle = () => {
        props.dispatch(collectBottle(props.bottle));
    };

    const backButton = <Button
        variant="contained" color="primary"
        onClick={() => {
            props.history.goBack()
        }}>
        Leave
    </Button>;

    if (props.bottle) {
        return (
            <div>
                <BottleInfo bottle={props.bottle}/>
                <div className="detail-buttons">
                    <Button className="take-button"
                        variant="contained" color="primary"
                        onClick={onTakeBottle}>
                        Take
                    </Button>
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

const mapDispatchToProps = (dispatch) => {
    return {dispatch};
};

export default connect(mapStateToProps, mapDispatchToProps)(BottleDetail);