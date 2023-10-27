import { CodeIcon, Contact, HappyEmoji, Visitor } from "@/components/Icon";
import React from "react";

const Dashboard = () => {
  return (
    <div className="container p-5 mx-auto">
      <div className="flex flex-wrap -m-4 text-center">
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
            <Visitor />
            <h2 className="title-font font-medium text-3xl text-white">2.7K</h2>
            <p className="leading-relaxed">Visitor</p>
          </div>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
            <Contact />
            <h2 className="title-font font-medium text-3xl text-white">2.7K</h2>
            <p className="leading-relaxed">Contact</p>
          </div>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
            <HappyEmoji />
            <h2 className="title-font font-medium text-3xl text-white">2.7K</h2>
            <p className="leading-relaxed">Happy</p>
          </div>
        </div>
        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
          <div className="border-2 border-gray-800 px-4 py-6 rounded-lg">
            <CodeIcon />
            <h2 className="title-font font-medium text-3xl text-white">2.7K</h2>
            <p className="leading-relaxed">Blog</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
