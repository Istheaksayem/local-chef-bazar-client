import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import { Navigate } from 'react-router';

const ChefRoute = ({children}) => {
    const {user,loading }=useAuth()
    if(loading) return null;
    if(user?.role !=="chef"){
        return <Navigate to="/dashboard"></Navigate>
    }
    return children;
};

export default ChefRoute;