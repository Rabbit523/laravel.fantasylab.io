import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import Routes from './server-routes'
import store from './store'
import * as action from './store/actions'

// Compile an initial state
const { page, status } = context;

const html = ReactDOMServer.renderToString(
    <div id="app">
        <StaticRouter location={context.url}>
            <Provider store={store}>
                <Routes page={page} status={status} />
            </Provider>
        </StaticRouter>
    </div>
);

dispatch(html);