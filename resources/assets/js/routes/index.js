import React from 'react'
import {
	BrowserRouter as Router,
	Switch
} from 'react-router-dom'

import routes from './routes'
import PublicRoute from './Public'
import PrivateRoute from './Private'
import AdminRoute from './Admin'
import ScrollToTop from '../ScrollToTop'

const Routes = () => (
	<Router>
		<ScrollToTop>
			<Switch>
				{routes.map((route, i) => {
					if (route.admin) {
						return <AdminRoute key={i} {...route} />
					} else if (route.auth) {
						return <PrivateRoute key={i} {...route} />
					} else {
						return <PublicRoute key={i} {...route} />
					}
				})}
			</Switch>
		</ScrollToTop>
	</Router>
);

export default Routes;