import React from "react";
import { TutorialLanguage } from "@/components/ClientComponents";

const TutorialList = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container p-10 mx-auto flex flex-wrap">
        <div className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className="flex flex-row justify-between">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Tutorial Add Language
            </h1>
          </div>
          <TutorialLanguage />
        </div>
      </div>
    </section>
  );
};

export default TutorialList;
