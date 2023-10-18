import { MDXComponents } from "@/components/MDXcomponents";
import { revalidateTag } from "next/cache";
import React from "react";

export interface SlugType {
  slug: string;
}

const getContent = async (slug: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorialcontentget/${slug}`,
    {
      method: "GET",
      headers: { "content-type": "application/json" },
      cache: "no-cache",
      next: {
        tags: ["getContent"],
      },
    }
  );
  const result = await res.json();

  return result;
};

const createContent = async (formData: FormData) => {
  // "use server";

  // const content = formData.get("content");
  // const slugTitle = formData.get("slugTitle");

  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorialcontentcreate`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({ content, slugTitle }),
  //     headers: { "content-type": "application/json" },
  //   }
  // );
  // const result = await res.json();
  // if (result) {
  //   revalidateTag("getContent");
  // }
};

const ContentData = async ({ params }: { params: any }) => {
  const contentData: any = await getContent(params?.contentslug);
  return (
    <>
      <section className="overflow-auto">
        <div className="container p-10 mx-auto overflow-auto">
          <form
            // action={createContent}
            className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 mb-10"
          >
            <div className="flex flex-row justify-between">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
                Add Content
              </h1>
            </div>
            <input type="hidden" value={params?.contentslug} name="slugTitle" />

            <div className="p-2 w-full">
              <div className="relative">
                <label
                  htmlFor="content"
                  className="leading-7 text-sm text-gray-400"
                ></label>
                <textarea
                  id="content"
                  name="content"
                  className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-y leading-6 transition-colors duration-200 ease-in-out"
                >
                  {contentData?.data[0]?.content}
                </textarea>
              </div>
            </div>

            <button
              type="submit"
              className={`border-0 py-2 px-8 focus:outline-none  rounded text-lg text-white bg-indigo-600`}
            >
              Add / Update
            </button>
          </form>

          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Content
            </h1>
          </div>

          <div className="container">
            <MDXComponents source={contentData?.data[0]?.content} />
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentData;
