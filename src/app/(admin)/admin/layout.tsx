import AdminHeader from "@/components/AdminHeader";
import Footer from "@/components/Footer";
import Link from "next/link";
import React, { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
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
            <li className="p-4 hover:bg-gray-600 cursor-pointer"><Link href="/admin/dashboard">Dashboard</Link></li>
            <li className="p-4 hover:bg-gray-600 cursor-pointer"><Link href="/admin/tutoriallist">Tutorial</Link></li>
            <li className="p-4 hover:bg-gray-600 cursor-pointer"><Link href="/admin/blog">Blog</Link></li>
            <li className="p-4 hover:bg-gray-600 cursor-pointer"><Link href="#">Settings</Link></li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-4">{children}</main>
      </div>

      <Footer />
    </>
  );
};

export default layout;
