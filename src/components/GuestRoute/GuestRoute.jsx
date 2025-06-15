import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../context/User.context";

const GuestRoute = ({ children }) => {
  const {token} = useContext(userContext)
  return token ? <Navigate to="/student" replace /> : children;
};

export default GuestRoute;
