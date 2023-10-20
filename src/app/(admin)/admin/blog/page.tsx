import { createPostAction } from "@/actions/serverAction";
import { ButtonDeleteBlog } from "@/components/ClientComponents";
import { ArrowRight } from "@/components/Icon";
import Link from "next/link";
import React from "react";

const getBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogget`, {
    method: "GET",
    next: {
      tags: ["fetchblog"],
    },
  });
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
          <form
              action={createPostAction}
              className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full"
            >
              <div className="flex flex-row justify-between">
                <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
                  New Blog Post
                </h1>
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="title"
                  className="leading-7 text-sm text-gray-400"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="description"
                  className="leading-7 text-sm text-gray-400"
                >
                  Description
                </label>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="author"
                  className="leading-7 text-sm text-gray-400"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="relative mb-4">
                <label
                  htmlFor="slug"
                  className="leading-7 text-sm text-gray-400"
                >
                  Slug
                </label>
                <input
                  type="text"
                  id="slug"
                  name="slug"
                  className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              <div className="py-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="content"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Content
                  </label>
                  <textarea
                    id="content"
                    name="content"
                    className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-y leading-6 transition-colors duration-200 ease-in-out"
                  ></textarea>
                </div>
              </div>

              <button
                type="submit"
                className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              >
                Post
              </button>
            </form>
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
