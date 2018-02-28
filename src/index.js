import React from 'react';
import ReactDOM from 'react-dom';
import { Router, MemoryRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import history from './history';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
    <Provider store={store}>
    <Router history={history}>
        <App />
    </Router>
    </Provider>
    ,
document.getElementById('root'));
registerServiceWorker();
