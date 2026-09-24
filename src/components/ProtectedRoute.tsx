import type React from "react";
import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/authService";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = getCurrentUser();

    if (!user?.authenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
}

export default ProtectedRoute;