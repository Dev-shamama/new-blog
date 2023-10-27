"use client";
import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import { Home } from "@/components/Icon";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { redirect, usePathname } from "next/navigation";
import React, { ReactNode, useEffect } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  const pathName = usePathname();
  const breadCrumbs = pathName?.split("/")!;
  breadCrumbs.splice(0, 2);

  const auth = useAuth();
  useEffect(() => {
    if (auth?.isAuth === false) {
      redirect("/sign");
    }
  }, [auth]);

  return (
    <>
      <AdminHeader />
      <div className="flex bg-gray-700">
        {/* Sidebar */}
        <aside className="bg-gray-800 text-white w-64 flex-shrink-0 min-h-screen">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Admin Panel</h1>
          </div>
          <ul className="flex-grow">
            <li className="p-4 hover:bg-gray-600 cursor-pointer">
              <Link href="/admin/dashboard">Dashboard</Link>
            </li>
            <li className="p-4 hover:bg-gray-600 cursor-pointer">
              <Link href="/admin/tutoriallist">Tutorial</Link>
            </li>
            <li className="p-4 hover:bg-gray-600 cursor-pointer">
              <Link href="/admin/blog">Blog</Link>
            </li>
            <li className="p-4 hover:bg-gray-600 cursor-pointer">
              <Link href="#">Settings</Link>
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4">
          <nav
            className="flex p-3 bg-gray-800 my-2 rounded-lg"
            aria-label="breadcrumbs"
          >
            <div className="flex items-center">
              <span className="text-gray-400">
                <Home />
              </span>
              <Link
                href="/admin/dashboard"
                className="text-blue-600 hover:underline mx-2 font-semibold"
              >
                Home
              </Link>
            </div>
            {breadCrumbs.map((item: any, index: number) => {
              let capitalize = item[0].toUpperCase() + item.slice(1);
              return (
                <div className="flex items-center" key={index}>
                  <span className="text-gray-400"> / </span>
                  <span className="text-gray-500 hover:underline mx-2">
                    {capitalize}
                  </span>
                </div>
              );
            })}
          </nav>

          <section className="text-gray-400 bg-gray-800 body-font overflow-hidden px-5 rounded-lg">
            {children}
          </section>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default layout;
