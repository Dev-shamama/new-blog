import {
  ButtonDeleteBlog,
  CreateBlogPost,
} from "@/components/ClientComponents";
import { ArrowRight } from "@/components/Icon";
import Link from "next/link";
import React from "react";
import { cookies } from "next/headers";

const getBlog = async (token: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/admin/adminblogget`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          cookie: `token=${token}`,
        },
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const result = await res.json();
    // console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return []; // Return an empty array or handle the error appropriately
  }
};

const Blog = async () => {
  const token = cookies().get("token")?.value!;
  const data = await getBlog(token);
  return (
    <>
        <div className="container p-5 mx-auto">
          {/* BLOG CREATE */}
          <div className="mb-10">
            <CreateBlogPost />
          </div>

          {/* BLOG SHOW */}
          <div className="-my-8 divide-y-2 divide-gray-800">
            <div className="py-8 flex flex-col flex-wrap md:flex-nowrap">
              {data && data.length === 0 ? (
                <div className="md:flex-grow  mb-6 bg-slate-700 p-6">
                  <h1>No Blog Found Yet</h1>
                </div>
              ) : (
                data &&
                data?.map((item: any) => (
                  <div
                    className="md:flex-grow  mb-6 bg-slate-700 p-6 rounded-lg"
                    key={item._id}
                  >
                    <div className="flex flex-row justify-between items-center cursor-default">
                      <h2 className="text-2xl font-medium text-white title-font mb-2">
                        {item.title}
                      </h2>
                      {item.status !== "PUBLIC" ? (
                        <p className="text-sm font-medium  py-1 px-2 bg-red-400 rounded-md text-white">
                          {item.status}
                        </p>
                      ) : (
                        <p className="text-sm font-medium  py-1 px-2 bg-green-400 rounded-md text-white">
                          {item.status}
                        </p>
                      )}
                    </div>

                    <p className="leading-relaxed">{item.description}</p>
                    <Link
                      href={`/blog/${item.slug}`}
                      className="text-indigo-400 inline-flex items-center mt-4 cursor-pointer"
                    >
                      Learn More
                      <ArrowRight />
                    </Link>
                    <p className="text-sm font-medium title-font mt-2">
                      {item.createAt.substring(0, 10)}
                    </p>

                    <div className="flex flex-row gap-2 mt-2">
                      <Link
                        href={`./blog/blogupdate/${item.slug}`}
                        className="bg-indigo-500 hover:bg-indigo-600  text-white  py-1 px-2 rounded-sm cursor-pointer"
                      >
                        Update
                      </Link>
                      <ButtonDeleteBlog id={item._id} />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
    </>
  );
};

export default Blog;
