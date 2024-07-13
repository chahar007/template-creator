import { useContext, createContext, useEffect, useState, useCallback, useMemo } from "react";
import axios from 'axios';
import { APP_CONSTANTS } from "./AppContext";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // let token = getParameterByName('jwt');
        // // console.log("")
        // APP_CONSTANTS.token.jwt = token
        // console.log('auth token', token)
    }, []);

    const validateToken = async () => {
        if (!APP_CONSTANTS.token.jwt) {
            navigate('/');
        }
        try {
            const res = await axios.post(`${process.env.REACT_APP_API_HOST}/login`, getAllParameters());
            APP_CONSTANTS.authData = res.data;
            APP_CONSTANTS.token.jwt = res.data.jwt;
            setIsAuth(true);
            console.log("logggggg")
            navigate("/splash");
        } catch (err) {
            navigate("/fallback");
            setIsAuth(false);
        } finally {
            setIsLoading(false);
        }
    };

    const getAllParameters = useCallback(() => {
        let params = {};

        window.location.search
            .slice(1)
            .split("&")
            .forEach((query) => {
                const queryKey = query.split("=")[0];
                if (queryKey && queryKey !== "jwt") {
                    params[queryKey] = getParameterByName(queryKey);
                } else if (queryKey === "jwt") {
                    APP_CONSTANTS.token.jwt = getParameterByName(queryKey);
                }
            });

        console.log('all params', params)

        return params;
    }, []);

    const getParameterByName = useCallback((name, url) => {
        if (!url) {
            url = window.location.href;
        }
        name = name.replace(/[\[\]]/g, "\\$&");
        const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        const results = regex.exec(url);
        if (!results) {
            return null;
        }
        if (!results[2]) {
            return "";
        }
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }, []);

    const contextValue = useMemo(() => ({ isAuth, validateToken }), [isAuth, validateToken]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => {
    return useContext(AuthContext);
};
