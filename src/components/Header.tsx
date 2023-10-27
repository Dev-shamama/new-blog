"use client";
import React from "react";
import { ArrowRight, Dashboard, NavbarIcon } from "./Icon";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const Header = () => {
  const auth = useAuth();
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <Link
          href="/"
          className="flex title-font font-medium items-center text-white mb-4 md:mb-0"
        >
          <NavbarIcon />
          <span className="ml-3 text-xl">ѕвѕ ∂єν</span>
        </Link>
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-700	flex flex-wrap items-center text-base justify-center">
          <Link href="/" className="mr-5 hover:text-white">
            Home
          </Link>
          <Link href="/tutorial" className="mr-5 hover:text-white">
            Tutorial
          </Link>
          <Link href="/blog" className="mr-5 hover:text-white">
            Blog
          </Link>
          <Link href="/contact" className="mr-5 hover:text-white">
            Contact
          </Link>
        </nav>

        {auth?.isAuth ? (
          <>
            <button
              onClick={() => auth.Logout()}
              className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mx-1"
            >
              Logout
              <ArrowRight />
            </button>
            <Link
            href="/admin/dashboard"
            className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0 mx-1"
          >
            Dashboard
            <Dashboard />
          </Link>
          </>
        ) : (
          <Link
            href="/sign"
            className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0"
          >
            Sign In
            <ArrowRight />
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
