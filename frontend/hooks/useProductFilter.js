"use client";

import { useContext } from "react";
import { ProductFilterContext } from "../context/ProductFilterContext";

export default function useProductFilter() {
  const context = useContext(ProductFilterContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}