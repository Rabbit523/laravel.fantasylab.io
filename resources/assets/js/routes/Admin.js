import React from 'react'
import {Route, Redirect} from 'react-router'
import {connect} from 'react-redux'
import Main from '../Main'


const AdminRoute = ({component: Component,isAuthenticated,isAdmin, ...rest}) => (
    <Route {...rest} render={props => (
        (isAuthenticated && isAdmin) ? (
            <Main>
                <Component {...props}/>
            </Main>
        ) : isAuthenticated ? (
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

const mapStateToProps = (state) => {
    console.log(state.Auth);
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        isAdmin: state.Auth.isAdmin
    }
};

export default connect(mapStateToProps)(AdminRoute);