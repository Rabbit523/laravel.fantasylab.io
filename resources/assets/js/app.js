import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import store from './store'
import Routes from './routes'
import * as action from './store/actions'
store.dispatch(action.authCheck());

// Grab the state from a global variable injected into the server-generated HTML
const { page } = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('app')
);