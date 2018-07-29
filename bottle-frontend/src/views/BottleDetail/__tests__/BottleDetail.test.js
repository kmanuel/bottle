import React from 'react';
import {mount} from 'enzyme';
import BottleDetail from '../';
import StoreWrapper from '../../../StoreWrapper';

let wrapped;

const initialState = {};

beforeEach(() => {
    wrapped = mount(<StoreWrapper initialState={initialState}><BottleDetail/></StoreWrapper>);
});

it('should display unknown bottle if no bottle found', () => {
    expect(wrapped.render().text()).toContain('Unknown bottle');
});

it('should display take button on non-taken bottle', () => {
    const state = {
        bottles: {
            all: [ {id: 1} ]
        }
    };
    const match = {
        params: { id: 1 }
    };
    wrapped = mount(
        <StoreWrapper initialState={state}>
            <BottleDetail match={match} />
        </StoreWrapper>);

    expect(wrapped.find('.take-button').length).toBeTruthy();

});

it('should not display take button on taken bottle', () => {
    const nonTakenBottleState = {
        bottles: {
            all: [
                {id: 1, collectedBy: 'someone'}
            ]
        }
    };
    const match = {
        params: {
            id: 1
        }
    };
    wrapped = mount(
        <StoreWrapper initialState={nonTakenBottleState}>
            <BottleDetail match={match} />
        </StoreWrapper>);

    expect(wrapped.find('.take-button').length).toBeFalsy();
});