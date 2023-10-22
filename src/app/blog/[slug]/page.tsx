import Footer from "@/components/Footer";
import Header from "@/components/Header";
import React from "react";
import { MDXComponents } from "@/components/MDXcomponents";
import readingTime from "reading-time";

const getBlog = async (slug: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogsingle?slug=${slug}`,
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

const FBlogSingle = async ({ params }: { params: any }) => {
  const data = await getBlog(params.slug);
  const readTime = readingTime(data[0].content)
  
  return (
    <>
      <Header />
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="container px-40 md:px-10 py-24 mx-auto">
          <div className="bg-gray-800 p-10 rounded-lg">
            <h2 className="text-3xl font-bold text-white title-font mb-2">
              {data[0]?.title}
            </h2>
            <div className="my-3 flex flex-col gap-3">
              <p>
                <strong>Author: </strong>
                {data[0]?.author
                  ? data[0]?.author
                  : "Shamama-Bin-Shakil"}
              </p>
              <p>
                <strong>Published: </strong>
                {data[0]?.createAt.substring(0, 10)}
              </p>
              <p>
                <strong>Read: </strong> {readTime.text}
              </p>
              <p>
                <strong>Word: </strong> {readTime.words}
              </p>
            </div>

            <div className="container">
              <MDXComponents source={data[0]?.content} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default FBlogSingle;
