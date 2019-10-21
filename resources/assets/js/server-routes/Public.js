import React from 'react'
import {Route} from 'react-router'
import ServerMain from '../Main'

const PublicRoute = ({component: Component,page,status, ...rest}) => (
    <Route {...rest} render={props => (
        <ServerMain status={status}>
            <Component {...props} page={page} status={status}/>
        </ServerMain>
    )}/>
);

export default PublicRoute;