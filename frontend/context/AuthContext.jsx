import { createContext, useEffect, useState } from "react";
import {
    logoutUserService,
    getCurrentUser,
} from "@/services/auth_service";
import { useRouter } from "next/navigation";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router= useRouter();
    async function logout() {
        await logoutUserService();
        setUser(null);
    }

    async function fetchCurrentUser() {
        try {
            const data = await getCurrentUser();
            setUser(data);
        } catch (error) {
            setUser(null);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (!user) {
            fetchCurrentUser();
            console.log('User fetched')
        }
    }, []);

    const value = {
        user,
        setUser,
        loading,
        logout,
        isAuthenticated: !!user,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}