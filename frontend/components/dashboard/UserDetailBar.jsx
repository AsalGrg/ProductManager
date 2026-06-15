"use client";

import { LogOutIcon, SearchIcon, SquareArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";
import useAuth from "../../hooks/useAuth";
import useProductFilter from "../../hooks/useProductFilter";
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "../ThemeToggler";

const UserDetailBar = () => {
  const { search, setSearch } = useProductFilter();
  const { logout } = useAuth();

  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className="
        bg-warm-white rounded-2xl p-3 sm:p-4
        flex items-start justify-between
        gap-3 sm:gap-4
      "
    >
      {/* Search box */}
      <div
        className="
          search-bar-wrapper
          flex-1 min-w-0
          max-w-full md:max-w-md
          min-h-10 sm:min-h-11
          rounded-4xl bg-pure-white
          flex items-center gap-2
          px-3 sm:px-4
        "
      >
        <SearchIcon
          width={20}
          height={20}
          className="sub-description shrink-0 sm:w-6 sm:h-6"
        />

        <input
          type="text"
          className="
            h-full flex-1 min-w-0
            text-txt-imp-1
            focus:outline-0
            bg-transparent
            text-sm sm:text-base
          "
          value={search}
          onChange={(e) => {
            if (pathname !== "/dashboard/products") {
              router.push("/dashboard/products");
            }

            setSearch(e.target.value);
          }}
          placeholder="Search products"
        />

        <SquareArrowRight
          width={20}
          height={20}
          className="sub-description shrink-0 sm:w-6 sm:h-6"
        />
      </div>

      {/* Top-right group */}
      <div
        className="
          flex items-start justify-end
          gap-3 sm:gap-6 lg:gap-8
          shrink-0
        "
      >
        <div className="avatar-container hidden sm:flex gap-2 items-center min-w-0">
          <div className="rounded-full aspect-square w-10 sm:w-12 shrink-0 overflow-hidden bg-blue-400">
            <Image
              src="/logo.png"
              alt=""
              width={32}
              height={32}
              className="object-cover w-full h-full"
            />
          </div>

          <div className="min-w-0 hidden md:block">
            <p className="font-semibold! truncate">Asal Gurung</p>
            <p className="sub-description truncate">Your Role</p>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-6 pt-2">
          <ThemeToggle />

          <LogOutIcon
            width={24}
            height={24}
            className="cursor-pointer text-txt-imp-1 shrink-0"
            onClick={logout}
          />
        </div>
      </div>
    </div>
  );
};

export default UserDetailBar;