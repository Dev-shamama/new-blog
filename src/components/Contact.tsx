import React from "react";
import { ContactForm } from "./ClientComponents";

const Contact = async () => {

  return (
    <section className="text-gray-400 bg-gray-900 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-white">
            Contact Us
          </h1>
          <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
            Please don't hesitate to contact us here.
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
