import React from 'react';
import {mount} from 'enzyme';
import BottleInfo from '../../BottleInfo';

const BOTTLE = {
    title: 'titletest',
    body: 'bodytest'
};

let wrapped;

beforeEach(() => {
    wrapped = mount(<BottleInfo bottle={BOTTLE}/>);
});

it('should display a the bottle\'s title and body', () => {
    expect(wrapped.render().text()).toContain(BOTTLE.title);
    expect(wrapped.render().text()).toContain(BOTTLE.body);
});

it('should display unknown if no bottle is supplied', () => {
    wrapped = mount(<BottleInfo />);

    expect(wrapped.render().text()).toContain('Unknown Bottle');
});