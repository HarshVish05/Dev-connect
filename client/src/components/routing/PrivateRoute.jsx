import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
    // taking component as props and ...rest indicates anything else as props
    const {loading, isAuthenticated} = useSelector(state => state.auth)
    if(!loading && !isAuthenticated){
        return <Navigate to={'/login'} />
    }
    else{
        return <Outlet />
    }

     
}
  

export default PrivateRoute;
