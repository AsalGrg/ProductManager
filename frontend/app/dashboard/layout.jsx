'use client'
import { SearchIcon, SquareArrowRight } from "lucide-react";
import SideBar from "../../components/dashboard/SideBar";
import Image from "next/image";
import UserDetailBar from "../../components/dashboard/UserDetailBar";
import { useRouter } from "next/navigation";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
export default function DashboardLayout({
  children,
}) {

  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [loading, user])


  return (
    <div className="min-h-screen flex font-inter p-4 gap-4 relative">
      {/* Sidebar */}
      <SideBar />

      {/* Main content */}
      <main className="flex-1 space-y-4 flex flex-col">

        {/* user detail */}
        <UserDetailBar />

        <div className="h-full">
          {children}
           <ToastContainer position="top-right" autoClose={3000} />
        </div>
      </main>
    </div>
  );
}