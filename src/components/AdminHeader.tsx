import React from "react";
import { ArrowRight, NavbarIcon } from "./Icon";

const AdminHeader = () => {
  return (
    <header className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center justify-between">
        <a className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
          <NavbarIcon />
          <span className="ml-3 text-xl">ѕвѕ ∂єν</span>
        </a>
        <button className="inline-flex items-center bg-gray-800 border-0 py-1 px-3 focus:outline-none hover:bg-gray-700 rounded text-base mt-4 md:mt-0">
          Logout
          <ArrowRight />
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
