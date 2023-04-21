import React, { useContext } from 'react';
import { userContext } from '../Provider/UserProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = ({ children }) => {

    const {user, loading} = useContext(userContext);

    const location = useLocation();
    console.log(location)

    if (loading) {
        return <progress className="progress w-56"></progress>
    }

    if (user) {
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>   //replace is not understand
};

export default PrivateRoute;