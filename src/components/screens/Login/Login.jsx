import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import loginService from "../../../config/services/LoginService";
import {jwtDecode} from "jwt-decode";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { APP_CONSTANTS } from "../../../config/utils/AppContext";
import { useAuth } from "../../../config/utils/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check for stored user data in localStorage
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("jwt");
    const storedTokens = localStorage.getItem("tokens");
    if (storedUser && storedToken && storedTokens) {
      APP_CONSTANTS.user = JSON.parse(storedUser);
      APP_CONSTANTS.jwt = storedToken;
      APP_CONSTANTS.token = JSON.parse(storedTokens);
      auth.setIsAuth(true);
      navigate("/video-creation");
    } else {
      auth.setIsAuth(false);

      localStorage.setItem("user", "");
      localStorage.setItem("jwt", "");
      localStorage.setItem("tokens", "");

      APP_CONSTANTS.user = null;
      APP_CONSTANTS.jwt = null;
      APP_CONSTANTS.token = null;
    }
  }, [auth, navigate]);

  useEffect(() => {
    getSyncTime();
  }, []);

  const getSyncTime = async () => {
    try {
      await loginService.syncTime();
    } catch { }
  };

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      setEmailError("Email is required.");
    } else if (!emailRegex.test(email)) {
      setEmailError("Invalid email format.");
    } else {
      setEmailError("");
    }
  };

  const validatePassword = () => {
    if (!password) {
      setPasswordError("Password is required.");
    } else if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else {
      setPasswordError("");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateEmail();
    validatePassword();

    if (!emailError && !passwordError && email && password) {
      setIsLoading(true);
      try {
        const data = await loginService.login({ email, password });

        // Save the response in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("jwt", data.tokens.access.token);
        localStorage.setItem("tokens", JSON.stringify(data.tokens));

        // Update the APP_CONSTANTS
        APP_CONSTANTS.user = data.user;
        APP_CONSTANTS.jwt = data.tokens.access.token;
        APP_CONSTANTS.token = data.tokens;

        // Update the authentication context
        auth.setIsAuth(true);

        setIsLoading(false);

        toast.success("Login successful!!!", { autoClose: 2000 });

        setTimeout(() => {
          navigate("/bulk-templates-generator");
        }, 1000);
      } catch (error) {
        setIsLoading(false);
        toast.error("Something went wrong, please try again!!!", {
          autoClose: 2000,
        });
      }
    }
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleGoogleFailure = (data) => {
    console.log({data})
    toast.error("Google Login failed, please try again!", { autoClose: 2000 });
  };
  const handleGoogleSuccess = async (response) => {
    const decoded = jwtDecode(response.credential);
    try {
      const data = await loginService.googleLogin(decoded);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("jwt", data.tokens.access.token);
      localStorage.setItem("tokens", JSON.stringify(data.tokens));

      APP_CONSTANTS.user = data.user;
      APP_CONSTANTS.jwt = data.tokens.access.token;
      APP_CONSTANTS.token = data.tokens;

      auth.setIsAuth(true);
      toast.success("Login successful!!!", { autoClose: 3000 });
      setTimeout(() => {
        navigate("/quotes");
      }, 1000);
    } catch (error) {
      console.log({error})
      toast.error("Google Login failed, please try again!", {
        autoClose: 2000,
      });
    }
  };

  const styles = {
    wrapper: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      background: "linear-gradient(270deg, #e0f7fa, #fad0c4, #e0f7fa, #e0f7fa)",
      backgroundSize: "800% 800%",
      animation: "moveBackground 15s ease infinite",
    },
    form: {
      backgroundColor: "#fff",
      padding: "40px",
      borderRadius: "10px",
      boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)",
      width: "400px",
      maxWidth: "90%",
    },
    title: {
      marginBottom: "20px",
      fontSize: "24px",
      textAlign: "center",
      color: "#333",
    },
    input: {
      width: "100%",
      padding: "10px",
      marginBottom: "10px",
      border: "1px solid #ddd",
      borderRadius: "5px",
      fontSize: "16px",
    },
    errorText: {
      color: "red",
      fontSize: "14px",
      marginBottom: "10px",
    },
    button: {
      width: "100%",
      padding: "10px",
      backgroundColor: isHovered ? "#3c6596" : "#4d7ebb",
      border: "none",
      borderRadius: "5px",
      color: "white",
      fontSize: "16px",
      cursor: "pointer",
      transition: "background-color 0.3s ease",
      marginBottom: "10px",
    },
    loader: {
      border: "4px solid #f3f3f3",
      borderRadius: "50%",
      borderTop: "4px solid #3498db",
      width: "16px",
      height: "16px",
      animation: "spin 1s linear infinite",
      display: "inline-block",
      marginLeft: "10px",
    },
    subheading: {
      marginBottom: "15px",
      fontSize: "12px",
      textAlign: "center",
      color: "#333",
    },
  };

  return (
    <GoogleOAuthProvider clientId="758363044936-7hjtue4hrfgdlkf4skqe49i0vmvilpkk.apps.googleusercontent.com">
      <div style={styles.wrapper}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.title}>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            onBlur={validateEmail}
            style={styles.input}
          />
          {emailError && <div style={styles.errorText}>{emailError}</div>}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            onBlur={validatePassword}
            style={styles.input}
          />
          {passwordError && <div style={styles.errorText}>{passwordError}</div>}
          <button
            type="submit"
            style={styles.button}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                Logging in...
                <span style={styles.loader}></span>
              </>
            ) : (
              "Login"
            )}
          </button>
          <h4 style={styles.subheading}>or</h4>
          {/* Todo: Add the width to the button */}
          <GoogleLogin
            width={styles.input.width}
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleFailure}
          />
        </form>
      </div>
    </GoogleOAuthProvider>
  );
};

export default Login;
