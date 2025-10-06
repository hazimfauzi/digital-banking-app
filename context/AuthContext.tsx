import { api } from "@/api/mock";
import { UserData } from "@/api/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
    user: UserData | null;
    loading: boolean;
    login: (phone: string, pin: string) => Promise<void>;
    signup: (name: string, phone: string, pin: string) => Promise<void>;
    logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    login: async () => { },
    signup: async () => { },
    logout: async () => { },
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);

    // Load stored session
    useEffect(() => {
        const load = async () => {
            const saved = await AsyncStorage.getItem("session");
            if (saved) setUser(JSON.parse(saved));
            setLoading(false);
        };
        load();
    }, []);

    // 🔐 Login
    const login = async (phone: string, pin: string) => {
        try {
            const res = await api.post("/login", { phone, pin });
            const userData = res.data.user;
            await AsyncStorage.setItem("session", JSON.stringify(userData));
            setUser(userData);
        } catch (err: any) {
            const message = err.response?.data?.message || "Login failed";
            throw new Error(message);
        }
    };

    // 🆕 Signup
    const signup = async (name: string, phone: string, pin: string) => {
        try {
            const res = await api.post("/signup", { name, phone, pin });
            const userData = res.data.user;
            await AsyncStorage.setItem("session", JSON.stringify(userData));
            setUser(userData);
        } catch (err: any) {
            const message = err.response?.data?.message || "Signup failed";
            throw new Error(message);
        }
    };

    // 🚪 Logout
    const logout = async () => {
        await AsyncStorage.removeItem("session");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
