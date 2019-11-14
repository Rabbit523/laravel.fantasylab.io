import React from 'react'
import {Route} from 'react-router'
import Main from '../Main'


const PublicRoute = ({component: Component, ...rest}) => {
    return (
    <Route {...rest} render={props => (
        <Main {...props}>
            <Component {...props}/>
        </Main>
    )}/>);
};


export default PublicRoute;