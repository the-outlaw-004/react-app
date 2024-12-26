import auth from "../../services/authService";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoggedIn = auth.getCurrentUser();
  return !isLoggedIn
    ? navigate("/login", { state: { from: { pathName: location.pathname } } })
    : // <Navigate to="/login" state={ from: location.pathname } />
      children;
};

export default ProtectedRoute;
