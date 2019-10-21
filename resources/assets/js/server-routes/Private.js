import React from 'react'
import {Route, Redirect} from 'react-router'
import ServerMain from '../Main'


const PrivateRoute = ({component: Component,page,status, ...rest}) => (
    <Route {...rest} render={props => (
        status.isAuthenticated ? (
            <ServerMain>
                <Component page={page} status={status} {...props}/>
            </ServerMain>
        ) : (
            <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
            }}/>
        )
    )}/>
);

export default PrivateRoute;