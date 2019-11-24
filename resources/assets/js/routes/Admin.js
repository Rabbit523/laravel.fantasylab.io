import React from 'react'
import { Route, Redirect } from 'react-router'
import Main from '../Main'


const AdminRoute = ({ component: Component, ...rest }) => {
	let isAuthenticated = false, isAdmin = false;
	if (typeof window !== 'undefined') {
		isAuthenticated = localStorage.getItem('isAuthenticated');
		isAdmin = localStorage.getItem('isAdmin');
	}
	
	if (isAuthenticated=='true' && isAdmin == 'true') {
		return (
			<Route {...rest} render={props => (
				<Main isAdmin={isAdmin} isAuthenticated={isAuthenticated} {...props}>
					<Component {...props} />
				</Main>
			)}/>
		)
	} else if (isAuthenticated == 'true') {
		return (
			<Route {...rest} render={props => (
				<Redirect to={{
					pathname: '/',
					state: { from: props.location }
				}} />
			)}/>
		)
	} else {
		return (
			<Route {...rest} render={props => (
				<Redirect to={{
					pathname: '/login',
					state: { from: props.location }
				}} />
			)}/>
		)
	}
};

export default AdminRoute;