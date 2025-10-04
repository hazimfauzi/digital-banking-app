import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';
import api from '../api/mockApi';

type User = { email: string; password: string };
type AuthContextType = {
    session: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    session: null,
    loading: true,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [session, setSession] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem('session');
            if (saved) setSession(JSON.parse(saved));
            setLoading(false);
        };
        load();
    }, []);

    const login = async (email: string, password: string) => {
        const res = await api.post('/login', { email, password });
        await AsyncStorage.setItem('session', JSON.stringify(res.data.user));
        setSession(res.data.user);
    };

    const signup = async (email: string, password: string) => {
        const res = await api.post('/signup', { email, password });
        await AsyncStorage.setItem('session', JSON.stringify(res.data.user));
        setSession(res.data.user);
    };

    const logout = async () => {
        await AsyncStorage.removeItem('session');
        setSession(null);
    };

    return (
        <AuthContext.Provider value={{ session, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
