import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import StoreWrapper from './StoreWrapper';

ReactDOM.render(
    <StoreWrapper>
        <App />
    </StoreWrapper>
    , document.getElementById('root'));
registerServiceWorker();

