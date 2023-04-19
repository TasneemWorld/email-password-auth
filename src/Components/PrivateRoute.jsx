import React, { useContext } from 'react';
import { userContext } from '../Provider/UserProvider';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const {user} = useContext(userContext);

    if (user) {
        return children;
    }

    return <Navigate to="/login" replace={true} ></Navigate>   //replace is not understand
};

export default PrivateRoute;