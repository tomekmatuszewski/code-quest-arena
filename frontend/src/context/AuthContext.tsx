import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import api from '@/lib/api';

interface User {
    username: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    login: (token: string) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    // We can't verify token without a /me endpoint or decoding it.
                    // For now, let's decode the simple way or just assume valid if exists until 401.

                    // Better: Decode token payload to get username/email if we put it there.
                    // Or just store user info in localStorage alongside token for simplicity
                    const storedUser = localStorage.getItem('user');
                    if (storedUser) {
                        setUser(JSON.parse(storedUser));
                    }
                } catch (error) {
                    console.error("Auth check failed", error);
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                }
            }
            setLoading(false);
        };

        checkAuth();
    }, []);

    const login = async (token: string) => {
        localStorage.setItem('token', token);

        // Ideally we fetch user profile here. 
        // Since our login response only has token, we might need to decode it
        // OR change backend to return user info.
        // Let's decode or fetch.
        // For this simple app, let's assume the component calling login sets the user, 
        // OR we decode the token if it has the email (sub).

        // Actually, let's fetch user details if we had a /me endpoint. 
        // Since we don't, we will rely on what backend sends or decode.
        // But wait, the Login page has the email.

        // Let's modify this: expected flow is Component calls API -> gets Token -> passes to login().
        // We should probably help set the user state.

        // Let's decode the JWT manually since 'jwt-decode' isn't installed provided we don't install more deps.
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            const userData = { email: payload.sub, username: payload.sub }; // We only put email in sub. Username isn't in token.
            // Wait, the backend Login response returns only { access_token, token_type }.
            // We really should return the user object too or have a /me endpoint.
            // I'll stick to simple: The Login component will have to handle setting user state? 
            // No, AuthContext should manage 'user'.

            // Let's lazily set email as username for now, or updating backend to return user is better.
            setUser(userData);
            localStorage.setItem('user', JSON.stringify(userData));
        } catch (e) {
            console.error("Failed to decode token", e);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            isAuthenticated: !!user,
            loading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
