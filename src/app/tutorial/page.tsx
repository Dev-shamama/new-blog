import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import HtmlLogo from "../../asset/tutorial/html.png";
import CssLogo from "../../asset/tutorial/css.png";
import JavascriptLogo from "../../asset/tutorial/javascript.png";
import PhpLogo from "../../asset/tutorial/php.png";
import MysqlLogo from "../../asset/tutorial/mysql.png";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

export interface ImageTutorialType {
  id: number;
  language: string;
  image: StaticImageData;
  href: string;
}

const Tutorial = () => {
  const tutorialData = [
    { id: 1, href: "/tutorial/html/html_default", language: "HTML", image: HtmlLogo },
    { id: 2, href: "/tutorial/css/css_default", language: "CSS", image: CssLogo },
    { id: 3, href: "/tutorial/javascript/javascript_default", language: "JavaScript", image: JavascriptLogo },
    // { id: 4, href: "#", language: "PHP", image: PhpLogo },
    // { id: 5, href: "#", language: "MySQL", image: MysqlLogo },
  ];

  return (
    <>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            {tutorialData.map((item: ImageTutorialType) => {
              return (
                <Link
                  href={item.href}
                  className="lg:w-1/4 md:w-1/2 p-4 w-full flex justify-center items-center flex-col"
                  key={item.id}
                >
                  <a className="block relative h-50 rounded overflow-hidden bg-slate-700">
                    <Image
                      src={item.image}
                      alt="Your Image Alt Text"
                      width={200}
                      height={100}
                      className="object-cover object-center rounded"
                    />
                  </a>
                  <div className="mt-4 text-center">
                    <h2 className="text-white title-font text-lg font-medium">
                      {item.language}
                    </h2>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Tutorial;
