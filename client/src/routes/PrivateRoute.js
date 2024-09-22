import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? element : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
