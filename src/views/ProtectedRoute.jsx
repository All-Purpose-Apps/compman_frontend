import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requiredRole }) => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.user.loading); // Assuming you have a loading state
    useEffect(() => {
        // Wait until loading is false before proceeding
        if (!loading) {
            if (!user) {
                // Redirect to login if not authenticated
                navigate("/auth/login", { replace: true });
            } else if (requiredRole && user.role !== requiredRole) {
                // Redirect to unauthorized page if the role doesn't match
                navigate("/unauthorized", { replace: true });
            }
        }
    }, [user, requiredRole, navigate, loading]);

    // Render a loading spinner while loading user info
    if (loading) {
        return <div>Loading...</div>; // Replace with a spinner if you have one
    }

    // Render children only if the user is authenticated and has the required role
    if (user && (!requiredRole || user.role === requiredRole)) {
        return children;
    }

    // Return null if none of the conditions are met, this is safe because useEffect handles navigation
    return null;
};

export default ProtectedRoute;