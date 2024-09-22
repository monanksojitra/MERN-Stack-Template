import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const RoleBasedRoute = ({ element, requiredRole, ...rest }) => {
  const { isLoggedIn, account } = useAuth();
  const userRole = account?.role; // Adjust according to your role property

  if (!isLoggedIn) {
    return <Navigate to="/sign-in" />;
  }

  if (userRole !== requiredRole) {
    return <Navigate to="/" />; // Redirect to a different page if the role doesn't match
  }

  return element;
};

export default RoleBasedRoute;
