import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import Link from "next/link";
import { ArrowRight } from "@/components/Icon";
import readingTime from "reading-time";

const getBlogData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogget`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const result = await res.json();
    return result.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return []; // Return an empty array or handle the error appropriately
  }
};

const Fblog = async () => {
  const data = await getBlogData();
  return (
    <>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-40 md:px-10 py-24 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="py-8 flex flex-col flex-wrap md:flex-nowrap">
              {data && data.length === 0 ? (
                <div className="md:flex-grow  mb-6 bg-slate-700 p-6">
                  <h1>Not Found</h1>
                </div>
              ) : (
                data &&
                data.map((item: any) => (
                  <div
                    className="md:flex-grow  mb-6 bg-slate-700 p-6 rounded-lg"
                    key={item._id}
                  >
                    <h2 className="text-2xl font-medium text-white title-font mb-2">
                      {item.title}
                    </h2>

                    <p className="leading-relaxed">{item.description}</p>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="text-indigo-400 inline-flex items-center mt-4 cursor-pointer"
                    >
                      Learn More
                      <ArrowRight />
                    </Link>
                    <div className="my-3 flex flex-row gap-3">
                      <p>
                        <strong>Author: </strong>
                        {item.author}
                      </p>
                      <p>
                        <strong>Published: </strong>
                        {item.createAt.substring(0, 10)}
                      </p>
                      <p>
                        <strong>Read: </strong> {readingTime(item.content).text}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Fblog;
