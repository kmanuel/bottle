import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import StoreWrapper from './StoreWrapper';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
        <StoreWrapper>
            <App />
        </StoreWrapper>
        , div);
    ReactDOM.unmountComponentAtNode(div);
});
