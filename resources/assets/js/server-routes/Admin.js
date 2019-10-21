import React from 'react'
import {Route, Redirect} from 'react-router'
import ServerMain from './Main'

const AdminRoute = ({component: Component,status,page, ...rest}) => (
    <Route {...rest} render={props => (
        (status.isAuthenticated && status.isAdmin) ? (
            <ServerMain status={status}>
                <Component page={page} status={status} {...props}/>
            </ServerMain>
        ) : status.isAuthenticated ? (
            <Redirect to={{
                pathname: '/',
                state: {from: props.location}
            }}/>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

export default AdminRoute;