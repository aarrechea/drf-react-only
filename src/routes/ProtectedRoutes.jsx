/* Imports */
import React from "react";
import { Navigate } from "react-router-dom";
import { getUser } from "../hooks/user.actions";



/* Protected route */
function ProtectedRoute({children}) {
    /* Constants */
    const user = getUser();

    
    /* Return */
    return user ? <>{children}</> : <Navigate to="/" />
}



/* Exports */
export default ProtectedRoute



