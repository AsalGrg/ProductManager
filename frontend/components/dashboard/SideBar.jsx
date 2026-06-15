"use client";

import Image from "next/image";
import React from "react";
import { LayoutDashboard, CheckSquare, LogOutIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import useAuth from "../../hooks/useAuth";

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
  const { logout } = useAuth();

  return (
    <aside
      className="
        w-20 sm:w-24 lg:w-64
        shrink-0
        rounded-2xl
        sticky top-0 h-screen overflow-y-auto overflow-x-hidden
        bg-warm-white dark:bg-[#1c1c1c]
        border border-transparent dark:border-[#2e2e2e]
      "
    >
      <div className="py-6 px-3 lg:px-4 flex items-center justify-center lg:justify-start gap-4">
        <Image src="/logo.png" width={32} height={32} alt="logo" />

        <h3 className="sub-heading dark:text-[#f0ece4] hidden lg:block">
          Productify
        </h3>
      </div>

      <nav className="mt-8 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              title={item.name}
              className="
                group relative flex items-center
                justify-center lg:justify-start
                gap-2
                px-3 sm:px-4 lg:px-8
                py-2
                sub-heading
              "
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-9 w-1.5 -translate-y-1/2 rounded-r-full bg-linear-to-t from-primary-green to-light-green" />
              )}

              <Icon
                className={`h-5 w-5 shrink-0 transition-all ${
                  isActive
                    ? "text-primary-green stroke-3"
                    : "stroke-2 group-hover:text-primary-green group-hover:stroke-3 text-txt-imp-2 dark:text-[#6b6560]"
                }`}
              />

              <span
                className={`transition-colors hidden lg:block ${
                  isActive
                    ? "text-txt-imp-1 dark:text-[#f0ece4]"
                    : "text-txt-imp-2 dark:text-[#a09a91] group-hover:text-txt-imp-1 dark:group-hover:text-[#f0ece4]"
                }`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SideBar;