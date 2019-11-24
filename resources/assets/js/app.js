import React from 'react'
import { render } from 'react-dom'
import { LocalizeProvider } from "react-localize-redux";
import Routes from './routes'

// Grab the state from a global variable injected into the server-generated HTML
const { page } = window.__PRELOADED_STATE__;

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

render(
	<LocalizeProvider>
		<Routes />
	</LocalizeProvider>,
	document.getElementById('app')
);