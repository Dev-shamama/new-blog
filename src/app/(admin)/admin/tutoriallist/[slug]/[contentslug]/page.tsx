import { ContentCreate } from "@/components/ClientComponents";
import { MDXComponents } from "@/components/MDXcomponents";
import React from "react";

export interface SlugType {
  slug: string;
}

const getContent = async (slug: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/tutorialcontent/contentget?slug=${slug}`,
      {
        method: "GET",
        cache: "no-cache",
      }
    );
    if (!res.ok) {
      throw new Error(`Request failed with status: ${res.status}`);
    }
    const result = await res.json();
    return result;
  } catch (error) {
    console.error("Error fetching blog data:", error);
    return []; // Return an empty array or handle the error appropriately
  }
};

const ContentData = async ({ params }: { params: any }) => {
  const contentData: any = await getContent(params?.contentslug);
  return (
    <>
      <section className="overflow-auto bg-gray-800">
        <div className="container p-10 mx-auto overflow-auto ">
          <ContentCreate
            itemContent={
              contentData?.data[0]?.content ? contentData?.data[0]?.content : ""
            }
            contentSlug={params?.contentslug}
          />

          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Content
            </h1>
          </div>

          <div className="container">
            {contentData.data.length === 0 ? (
              <div className="md:flex-grow  text-lg bg-slate-600 p-6 text-white">
                <h1>No Content Yet</h1>
              </div>
            ) : (
              <MDXComponents source={contentData?.data[0]?.content} />
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default ContentData;
