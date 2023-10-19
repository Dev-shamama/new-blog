import {
  ButtonAdd,
  ButtonAddContent,
  ButtonDelete,
  ButtonDeleteHeadingList,
  ButtonHeadingUpdate,
  ButtonUpdateHeadingList,
} from "@/components/ClientComponents";
import React from "react";

export interface SlugType {
  slug: string;
}

const getTutorialHeading = async (params: any) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistget/${params.slug}`
  );
  const result = await res.json();
  return result;
};

const createListAdd = async (formData: FormData) => {
  // "use server";
  // const heading = formData.get("heading");
  // const title = formData.get("title");
  // const slug = formData.get("slug");
  // const langSlug = formData.get("id");
  // const res = await fetch(
  //   `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistcreate/tutoriallistcreateHeading/${langSlug}`,
  //   {
  //     method: "POST",
  //     body: JSON.stringify({ heading, title, slug }),
  //     headers: { "content-type": "application/json" },
  //   }
  // );
  // const result = await res.json();
  // if (result.success === true) {
  //   revalidateTag("change");
  // }
};

const page = async ({ params }: { params: SlugType }) => {
  const data = await getTutorialHeading(params);
  console.log(data);
  return (
    <>
      <section className="text-gray-400 bg-gray-900 body-font overflow-auto">
        <div className="container p-10 mx-auto overflow-auto">
          <form
            // action={createListAdd}
            className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 mb-10"
          >
            <div className="flex flex-row justify-between">
              <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
                Language Tutorial List Add
              </h1>
            </div>
            <input type="hidden" value={params.slug} name="id" />

            <div className="relative mb-4">
              <label
                htmlFor="heading"
                className="leading-7 text-sm text-gray-400"
              >
                Heading
              </label>
              <input
                type="text"
                id="heading"
                name="heading"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
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
              <label htmlFor="slug" className="leading-7 text-sm text-gray-400">
                Slug
              </label>
              <input
                type="text"
                id="slug"
                name="slug"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>

            <button
              type="submit"
              className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
            >
              Add
            </button>
          </form>

          <div className="flex flex-row justify-between w-full mb-5">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Language Tutorial List Detail {data.data[0].language}
            </h1>
          </div>

          <div className="w-full mx-auto overflow-auto">
            {data &&
              data?.data &&
              data?.data[0]?.list.map((item: any, index: number) => {
                return (
                  <>
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
                  </>
                );
              })}
          </div>
        </div>
      </section>
    </>
  );
};

export default page;
