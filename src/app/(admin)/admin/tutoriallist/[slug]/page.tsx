// import { createListAdd } from "@/actions/serverAction";
import {
  ButtonAdd,
  ButtonAddContent,
  ButtonDelete,
  ButtonDeleteHeadingList,
  ButtonHeadingUpdate,
  ButtonUpdateHeadingList,
  LanguageListHeadingCreate,
} from "@/components/ClientComponents";
import React from "react";

export interface SlugType {
  slug: string;
}

const getTutorialHeading = async (params: any) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/languagesingle?lang=${params.slug}`,
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

const page = async ({ params }: { params: SlugType }) => {
  const data = await getTutorialHeading(params);

  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font overflow-auto">
        <div className="container p-10 mx-auto overflow-auto">

          <LanguageListHeadingCreate paramSlug={params.slug} />
          

          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Language Tutorial List Detail {data.language}
            </h1>
          </div>

          <div className="w-full mx-auto overflow-auto">
            {data[0]?.list.length === 0 ? (
              <h1>Not Found</h1>
            ) : (
              data[0]?.list.map((item: any, index: number) => {
                return (
                  <div key={index}>
                    <div className="flex flex-row items-center gap-2">
                      <ButtonHeadingUpdate
                        heading={item?.heading}
                        headingId={item?._id}
                        id={params?.slug}
                      />
                      <ButtonDelete headingId={item?._id} id={params.slug} />
                      <ButtonAdd headingId={item?._id} id={params.slug} />
                    </div>
                    <table className="table-auto w-full text-left whitespace-no-wrap">
                      <thead>
                        <tr>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                            S.No
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                            Title
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                            Slug
                          </th>
                          <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                            Operation
                          </th>
                        </tr>
                      </thead>
                      <tbody className="m-3">
                        {item?.children.map((child: any, index: number) => {
                          return (
                            <tr key={child?._id}>
                              <td className="px-4 py-3">{index + 1}</td>
                              <td className="px-4 py-3">{child?.title}</td>
                              <td className="px-4 py-3">{child?.slug}</td>
                              <td className="w-10 text-center flex flex-row gap-3">
                                <ButtonDeleteHeadingList
                                  headingId={item?._id}
                                  slugId={params.slug}
                                  listId={child?._id}
                                  contentSlug={child?.slug}
                                />
                                <ButtonUpdateHeadingList
                                  {...child}
                                  headingId={item?._id}
                                  slugId={params.slug}
                                  listId={child?._id}
                                  contentSlug={child?.slug}
                                />
                                <ButtonAddContent
                                  slug={child?.slug}
                                  slugId={params.slug}
                                />
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
