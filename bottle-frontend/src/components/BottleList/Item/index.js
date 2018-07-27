import React from 'react';
import './BottleListItem.css';
import {Link} from 'react-router-dom';

export default (props) => {
    const {bottle} = props;

    return <Link to={`/bottle/${bottle.id}`} className="bottle-list-item">
        <div className="bottle-image list-item-image"></div>
        <div className="list-item-text">
            <h3>{bottle.title}</h3>
            <p>{bottle.body}</p>
        </div>
    </Link>
};