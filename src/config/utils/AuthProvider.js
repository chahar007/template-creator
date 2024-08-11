import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(false);
    const navigate = useNavigate();

    const handleUnauthorized = () => {
        setIsAuth(false);
        navigate('/login'); // Redirect to login
    };

    const contextValue = useMemo(() => ({ isAuth, setIsAuth, handleUnauthorized }), [isAuth, navigate]);

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
