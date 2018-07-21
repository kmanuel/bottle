import React from 'react';
import BottleInfo from '../../components/bottleinfo/Bottleinfo';
import Button from '@material-ui/core/Button';
import './BottleDetail.css';

const BottleDetail = (props) => {

    return (
        <div>
            <BottleInfo />
            <div className="detail-buttons">
                <Button
                    variant="contained" color="primary">
                    Take
                </Button>
                <Button
                    variant="contained" color="primary"
                    onClick={() => {
                        props.history.goBack()
                    }}>
                    Leave
                </Button>
            </div>
        </div>
    );
};

export default BottleDetail;