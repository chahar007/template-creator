import { useEffect } from "react";
import { useAuth } from "../../../config/utils/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    setTimeout(() => {
      auth.validateToken();
    }, 10);
  }, []);

  return null;
};

export default Login;
