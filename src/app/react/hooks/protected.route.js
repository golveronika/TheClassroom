import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const isLogged = useSelector(state => state.loggedUser.isLogged);
    
    return (
        <Route {...rest} render={(props) => {
            if (isLogged) {
                return <Component {...props}/>
            } else {
                return <Redirect to={{ pathname: "/loggin", state: { from: props.location } }} {...props}/>
            }
            }} />
    )
}

export default ProtectedRoute;