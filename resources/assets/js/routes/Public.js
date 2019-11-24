import React from 'react'
import { Route } from 'react-router'
import Main from '../Main'

const PublicRoute = ({ component: Component, ...rest }) => {
	let isAuthenticated = false, isAdmin = false;
	if (typeof window !== 'undefined') {
		isAuthenticated = localStorage.getItem('isAuthenticated');
		isAdmin = localStorage.getItem('isAdmin');
	}
	return (
		<Route {...rest} render={props => (
			<Main isAdmin={isAdmin} isAuthenticated={isAuthenticated} {...props}>
				<Component {...props} />
			</Main>
		)} />);
};


export default PublicRoute;