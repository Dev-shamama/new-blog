import { ButtonDeleteBlog } from "@/components/ClientComponents";
import { ArrowRight } from "@/components/Icon";
import Link from "next/link";
import React from "react";

const getBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogget`);
  const result = await res.json();
  return result;
};


const Blog = async () => {
  const data = await getBlog();
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font overflow-hidden px-24">
        <div className="container px-5 py-10 mx-auto">
          <div className="mb-10">
            <Link
              href="./blog/blogcreate"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
            >
              New Post
            </Link>
          </div>

          <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="py-8 flex flex-col flex-wrap md:flex-nowrap">
              {data?.data && data?.data.map((item: any) => (
                <div className="md:flex-grow  mb-6 bg-slate-700 p-6" key={item._id}>
                  <h2 className="text-2xl font-medium text-white title-font mb-2">
                    {item.title}
                  </h2>

                  <p className="leading-relaxed">{item.description}</p>
                  <Link
                    href={`/blog/get/${item.slug}`}
                    className="text-indigo-400 inline-flex items-center mt-4 cursor-pointer"
                  >
                    Learn More
                    <ArrowRight />
                  </Link>
                  <p className="text-sm font-medium title-font mt-2">
                    {item.createAt.substring(0, 10)}
                  </p>

                  <div className="flex flex-row gap-2 mt-2">
                    <Link href={`./blog/blogupdate/${item.slug}`}
                      className="bg-indigo-500 hover:bg-indigo-600  text-white  py-1 px-2 rounded-sm cursor-pointer"
                    >
                      Update
                    </Link>
                    <ButtonDeleteBlog id={item._id} />
                    
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Blog;
