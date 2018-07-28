import React from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const BottleInfo = (props) => {

    if (props.bottle) {
        return (
            <Card>
                <CardContent>
                    <h1>{props.bottle.title}</h1>
                    <p>{props.bottle.body}</p>
                </CardContent>
            </Card>
        )
    } else {
        return <div>Unknown Bottle</div>
    }
};

export default BottleInfo;