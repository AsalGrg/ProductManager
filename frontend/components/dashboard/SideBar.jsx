"use client";
import Image from 'next/image'
import React from 'react'
import { LayoutDashboard, CheckSquare, Calendar, LogOut, LogOutIcon } from "lucide-react";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const menuItems = [
    {
        name: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Products",
        href: "/dashboard/products",
        icon: CheckSquare,
    },
];


const SideBar = () => {

    const pathname = usePathname();

    return (
        <aside className="w-64 bg-warm-white rounded-2xl sticky ">


            <div className='py-6 px-4 flex gap-4'>
                <Image src={'/logo.png'} width={32} height={32} />
                <h3 className='sub-heading'>Productify</h3>
            </div>
            <nav className="mt-8 space-y-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;

                    return (
                        <Link
                            href={item.href}
                            className="group relative flex items-center gap-2 px-8 py-2 sub-heading"
                        >
                            {isActive && (
                                <span className="absolute left-0 top-1/2 h-9 w-1.5 -translate-y-1/2 rounded-r-full bg-linear-to-t from-primary-green to-light-green" />
                            )}

                            <Icon
                                className={`h-5 w-5 transition-all ${isActive
                                    ? "text-primary-green stroke-3"
                                    : "sub-description stroke-2 group-hover:text-primary-green group-hover:stroke-3"
                                    }`}
                            />

                            <span
                                className={`transition-colors ${isActive
                                    ? "text-txt-imp-1"
                                    : "text-txt-imp-2 group-hover:text-txt-imp-1"
                                    }`}
                            >
                                {item.name}
                            </span>
                        </Link>
                    );
                })}


                <div className='mt-20 space-x-2 sub-heading text-txt-imp-2! ml-8 cursor-pointer flex'>
                    <h3>Logout</h3>
                </div>

            </nav>


        </aside>
    )
}

export default SideBar