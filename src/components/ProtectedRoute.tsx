import type React from "react";
import { useEffect, useState } from "react";
import { getUser } from "../services/authService";
import { Navigate } from "react-router-dom";

function ProtectedRoute({children}: {children: React.ReactNode} ) {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        getUser().then((user) => {
            setIsAuthenticated(user.authenticated);
        })
        .catch((error) => {
            console.error("Could not check authentication", error);
            setIsAuthenticated(false);
        })
    }, [])

    if(isAuthenticated === null) {
        return null;
    }

    if(!isAuthenticated) {
        return <Navigate to="/" replace />
    }

    
    return children;
}

export default ProtectedRoute