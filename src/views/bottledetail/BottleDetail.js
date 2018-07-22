import React, { Component } from 'react';
import { connect } from 'react-redux';
import BottleInfo from '../../components/bottleinfo/Bottleinfo';
import Button from '@material-ui/core/Button';
import './BottleDetail.css';


const BottleDetail = (props) => {

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
                    <Button
                        variant="contained" color="primary">
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