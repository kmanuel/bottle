import React from 'react';
import './BottleListItem.css';
import {Link} from 'react-router-dom';
import ListItemText from '@material-ui/core/ListItemText';

export default (props) => {
    const {bottle} = props;

    return <Link to={`/bottle/${bottle.id}`} className="bottle-list-item">
        <div className="bottle-image list-item-image"></div>
        <ListItemText primary={bottle.title} secondary={bottle.body}/>
    </Link>
};