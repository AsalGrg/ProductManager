"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ProductFilterContextProvider } from "@/context/ProductFilterContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function Providers({ children }) {
    return (

        <ThemeProvider>
            <AuthProvider>
                <ProductFilterContextProvider>
                    {children}
                </ProductFilterContextProvider>
            </AuthProvider>
        </ThemeProvider>
    )
}