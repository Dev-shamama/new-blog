"use client";

import { LoginForm } from "@/components/ClientComponents";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Sign = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth?.isAuth) {
      redirect("/admin/dashboard");
    }
  }, [auth]);

  return (
    <>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto flex flex-wrap items-center">
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <h1 className="title-font font-medium text-3xl text-white">
              Welcome back! Just Admin Login
            </h1>
            <p className="leading-relaxed mt-4">
              Welcome back, Admin! You're now logged in with administrative
              privileges. Let's manage and oversee things together.
            </p>
          </div>
          <LoginForm />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Sign;
