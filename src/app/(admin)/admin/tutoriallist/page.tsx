import {
  ButtonLanguageUpdate,
  ButtonLanguageDelete,
} from "@/components/ClientComponents";
import Link from "next/link";
import React from "react";

// const getTutorialList = async () => {
//   // "use server"
//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistget`, {
//     method: "GET",
//     cache: "no-cache",
//     next: {
//       tags: ['tutorial']
//     }
//   });
//   const result = await res.json();
//   return result;
// };

const TutorialList = async () => {
  // const result =  await getTutorialList()
  
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-auto">
      <div className="container p-10 mx-auto">
        <div className="flex flex-row items-center justify-between w-full mb-5">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
            Language Tutorial List
          </h1>
          <Link
            href="/admin/tutoriallist/tutoriallistadd"
            className="flex ml-auto text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
          >
            Add Language
          </Link>
        </div>
        <div className="w-full mx-auto overflow-auto">
          <table className="table-auto w-full text-left whitespace-no-wrap">
            <thead>
              <tr>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800 rounded-tl rounded-bl">
                  S.No
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                  Language
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                  CreateAt
                </th>
                <th className="px-4 py-3 title-font tracking-wider font-medium text-white text-sm bg-gray-800">
                  Operation
                </th>
              </tr>
            </thead>
            {/* <tbody className="m-3">
              {result?.data && result?.data?.length === 0 ? (
                <div className="md:flex-grow  mb-6 bg-slate-700 p-6">
                  <h1>Not Found</h1>
                </div>
              ) : (
                result?.data.map((item: any, index: number) => {
                  return (
                    <tr key={item._id}>
                      <td className="px-4 py-3">{index + 1}</td>
                      <td className="px-4 py-3">{item.language}</td>
                      <td className="px-4 py-3">
                        {String(item.createAt).substring(0, 10)}
                      </td>
                      <td className="w-10 text-center flex flex-row gap-3">
                        <ButtonLanguageDelete langId={item._id} />
                        <ButtonLanguageUpdate
                          langId={item._id}
                          language={item.language}
                        />
                        <Link
                          href={`/admin/tutoriallist/${item.language}`}
                          className=" text-white font-bold underlinebg-blue-500 bg-blue-500 hover:bg-blue-600 py-2 px-4 rounded-full cursor-pointer my-2"
                        >
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody> */}
          </table>
        </div>
      </div>
    </section>
  );
};

export default TutorialList
