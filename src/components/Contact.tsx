import React from "react";
import { Chat, FaceBook, Instagram, Twitter } from "./Icon";

const contactPostHandler = async (formData: FormData) => {
  // "use server";
  // const name = formData.get("name");
  // const email = formData.get("email");
  // const message = formData.get("message");
  // const res = await fetch("http://localhost:3000/api/contact/create", {
  //   method: "POST",
  //   body: JSON.stringify({ name, email, message }),
  //   headers: { "content-type": "application/json" },
  // });
  // const result = await res.json();
};
const getContact = async () => {
  const res = await fetch('http://localhost:3000/api/contact/get');
  const result = await res.json();
  return result;
}

const Contact = async () => {
  const result = await getContact();
  console.log(result);
  
  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <h1>Contact Page</h1>
      {/* <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Please don't hesitate to contact us here.
          </p>
        </div>
        <form 
        // action={contactPostHandler}
         className="lg:w-1/2 md:w-2/3 mx-auto">
          <div className="flex flex-wrap -m-2">
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-400"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-1/2">
              <div className="relative">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-400"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
            </div>
            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-400"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
            </div>
            <div className="p-2 w-full">
              <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Submit
              </button>
            </div>
            <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
              <a className="text-indigo-400">rohishamama@gmail.com</a>
              <br />
              <br />
              <span className="inline-flex">
                <a className="text-gray-500">
                  <FaceBook />
                </a>
                <a className="ml-4 text-gray-500">
                  <Twitter />
                </a>
                <a className="ml-4 text-gray-500">
                  <Instagram />
                </a>
                <a className="ml-4 text-gray-500">
                  <Chat />
                </a>
              </span>
            </div>
          </div>
        </form>
      </div> */}
    </section>
  );
};

export default Contact;
