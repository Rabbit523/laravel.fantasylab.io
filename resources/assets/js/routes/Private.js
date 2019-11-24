import React from 'react'
import { Route, Redirect } from 'react-router'
import Main from '../Main'


const PrivateRoute = ({ component: Component, ...rest }) => {
	let isAuthenticated = false, isAdmin = false;
	if (typeof window !== 'undefined') {
		isAuthenticated = localStorage.getItem('isAuthenticated');
		isAdmin = localStorage.getItem('isAdmin');
	}
	return (<Route {...rest} render={props => (
		isAuthenticated ? (
			<Main isAdmin={isAdmin} isAuthenticated={isAuthenticated} {...props}>
				<Component {...props} />
			</Main>
		) : (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
			)
	)} />);
};

export default PrivateRoute;