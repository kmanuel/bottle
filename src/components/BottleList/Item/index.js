import React from 'react';
import './BottleListItem.css';
import {Link} from 'react-router-dom';

export default (props) => <Link to={`/bottle/${props.bottle.id}`} className="bottle-list-item">
    <div className="bottle-image list-item-image"></div>
    <div className="list-item-text">
        <h3>Lorem ipsum dolor sit amet.</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. A accusamus commodi ducimus facilis itaque minus neque officiis omnis quibusdam temporibus?</p>
    </div>
</Link>