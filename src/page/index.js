import React, { Component } from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { createHashHistory } from 'history'

import store from './store.js';

import Main from './Main.jsx';

const history = createHashHistory();
ReactDom.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <Main />
        </ConnectedRouter>
    </Provider>,
    document.getElementById("vote")
)