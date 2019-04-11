import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { USER_STORAGE_KEY } from "../_services/userService";

const PrivateRoute = ({ component: Component, ...rest }) => {
    const user = localStorage.getItem(USER_STORAGE_KEY);

    return <Route
        {...rest}
        render={props => (
            user
                ? <Component {...props} />
                : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )} />
};

export default PrivateRoute;