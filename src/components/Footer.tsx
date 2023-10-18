import React from "react";
import { Chat, FaceBook, Instagarm, NavbarIcon, Twitter } from "./Icon";

const Footer = () => {
  return (
    <footer className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
        <a className="flex title-font font-medium items-center md:justify-start justify-center text-white">
          <NavbarIcon />
          <span className="ml-3 text-xl">ѕвѕ ∂єν</span>
        </a>
        <p className="text-sm text-gray-400 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-800 sm:py-2 sm:mt-0 mt-4">
          © 2023 ѕвѕ ∂єν —
          <a
            href="https://twitter.com/knyttneve"
            className="text-gray-500 ml-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            @shamamabinshakil
          </a>
        </p>

        <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
          <a className="text-gray-500">
            <FaceBook />
          </a>
          <a className="ml-4 text-gray-500">
            <Twitter />
          </a>
          <a className="ml-4 text-gray-500">
            <Instagarm />
          </a>
          <a className="ml-4 text-gray-500">
            <Chat />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
