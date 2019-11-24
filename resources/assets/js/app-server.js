import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import Routes from './server-routes'

// Compile an initial state
const { page, status } = context;

const html = ReactDOMServer.renderToString(
    <div id="app">
        <StaticRouter location={context.url}>
            <Routes page={page} status={status} />
        </StaticRouter>
    </div>
);

dispatch(html);