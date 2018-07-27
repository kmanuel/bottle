import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import BottleListItem from './Item/index';


const toBottleListItem = (bottle) => {
    return <ListItem key={bottle.id} button>
        <ListItemText primary={<BottleListItem bottle={bottle} />} />
    </ListItem>;
};

const BottleList = (props) => {
    const listItems = props.bottles.map(toBottleListItem);

    return <div>
        <List>
            {listItems}
        </List>
    </div>;
};

export default BottleList;