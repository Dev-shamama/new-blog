import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MDXComponents } from "@/components/MDXcomponents";
import Link from "next/link";
import React from "react";

export interface SlugType {
  slug: string;
  langslug: string;
}

const getTutorialHeading = async (params: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistget/${params}`,
    {
      method: "GET",
      cache: "no-cache",
      next: {
        tags: ["change"],
      },
    }
  );
  const result = await res.json();
  return result;
};

const getContent = async (slug: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorialcontentget/${slug}`,
    {
      method: "GET",
      cache: "no-cache",
    }
  );
  const result = await res.json();
  return result;
};

const Html = async ({ params }: { params: SlugType }) => {
  const data = await getTutorialHeading(params.slug);
  const content = await getContent(params.langslug);
  return (
    <>
      <Header />
      <div className="flex bg-gray-700">
        <div className="bg-gray-800 text-white w-64 flex-shrink-0 overflow-auto container-with-scroll">
          <ul className="flex-grow">
            {data.data.map((item: any) => {
              return (
                <li
                  className="p-2 hover:bg-gray-600 cursor-pointer"
                  key={item._id}
                >
                  {item.list.map((itemList: any) => {
                    return (
                      <div key={itemList._id}>
                        <h1 className="font-semibold text-lg">
                          {itemList.heading}
                        </h1>
                        {itemList.children.map((itemChildren: any) => {
                          return (
                            <ul className="ml-3" key={item.id}>
                              <li className="p-2 text-sm hover:underline">
                                <Link href={itemChildren.slug}>
                                  {itemChildren.title}
                                </Link>
                              </li>
                            </ul>
                          );
                        })}
                      </div>
                    );
                  })}
                </li>
              );
            })}
          </ul>
        </div>
        <section className="container p-10 mx-auto overflow-auto">
          <div className="container">
            <MDXComponents source={content?.data[0]?.content} />
          </div>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default Html;
