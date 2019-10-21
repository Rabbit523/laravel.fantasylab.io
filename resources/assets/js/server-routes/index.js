import React from 'react'
import routes from './routes'
import PublicRoute from './Public'
import PrivateRoute from './Private'
import AdminRoute from './Admin'

const Routes = ({page, status}) => (
    <React.Fragment>
        {routes.map((route,i) => {
            if (route.admin) {
                return <AdminRoute key={i} page={page} status={status} {...route}/>
            } else if (route.auth) {
                return <PrivateRoute key={i} page={page} status={status} {...route}/>
            } else {
                return <PublicRoute key={i} page={page} status={status} {...route}/>
            }
        })}
    </React.Fragment>
);

export default Routes;