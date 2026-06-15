"use client";

import { AuthProvider } from "@/context/AuthContext";
import { ProductFilterContextProvider } from "@/context/ProductFilterContext";

export default function Providers({ children }) {
    return (

        <AuthProvider>
            <ProductFilterContextProvider>
                {children}
            </ProductFilterContextProvider>
        </AuthProvider>
    )
}