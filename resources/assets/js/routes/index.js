import React from 'react'
import {
	BrowserRouter as Router,
	Switch
} from 'react-router-dom'

import routes from './routes'
import PublicRoute from './Public'
import PrivateRoute from './Private'
import AdminRoute from './Admin'

const Routes = () => (
	<Router>
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
	</Router>
);

export default Routes;