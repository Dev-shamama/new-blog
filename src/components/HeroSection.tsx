import React from "react";
import heroImage from "../asset/heroimage.jpg";
import Image from "next/image";
const HeroSection = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-white">
            Explore the Latest Articles and Insights
          </h1>
          <p className="mb-8 leading-relaxed">
            Discover amazing content and stay updated with the latest trends
          </p>
          <div className="flex justify-center">
            <button className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
              Learn More
            </button>
            {/* <button className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg">
                Button
              </button> */}
          </div>
        </div>
        <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
          <Image
            src={heroImage}
            alt="Your Image Alt Text"
            width={1000}
            height={1000}
            className="object-cover object-center rounded"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;