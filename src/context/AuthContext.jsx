import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({children}){
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        const storedRole = localStorage.getItem('role');
        const storedToken = localStorage.getItem('token');

        if(storedUser && storedRole && storedToken ) {
            setUser(JSON.parse(storedUser));
            setRole(storedRole);
            setToken(storedToken);
        }
    }, []);

    const login = (userData, roleData, tokenData) => {
        setUser(userData);
        setRole(roleData);
        setToken(tokenData);

        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('role', roleData);
        localStorage.setItem('token', tokenData);

    };

    const logout = () => {
        setUser(null);
        setRole(null);
        setToken(null);

        localStorage.removeItem('user');
        localStorage.removeItem('role');
        localStorage.removeItem('token');

        alert('Has cerrado sesión correctamente');
    };

    return (
        <AuthContext.Provider value={{ user, role, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}