import {
    BrowserRouter as Router,
} from 'react-router-dom'
import React from 'react';
import {mount} from 'enzyme';
import BottleList from '../../BottleList';
import Item from '../../BottleList/Item';

const BOTTLES = [
    {
        id: 1,
        title: 'title1',
        body: 'body1'
    }, {
        id: 2,
        title: 'title2',
        body: 'body2'
    }
];

it('should display a list-item for each bottle', () => {
    const wrapped = mount(<Router><BottleList bottles={BOTTLES}/></Router>);

    expect(wrapped.find(Item).length).toEqual(2);
});