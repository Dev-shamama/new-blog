import React from "react";
import { redirect } from "next/navigation";

// const createLanguage = async (formData: FormData) => {
//   "use server"
//   const language = formData.get("language");

//   const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistcreate`, {
//     method: "POST",
//     body: JSON.stringify({ language }),
//     headers: { "content-type": "application/json" },
//   });
//   const result = await res.json();
//   if (result.success == true) {
//     redirect("/admin/tutoriallist");
//   }
// };

const TutorialList = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container p-10 mx-auto flex flex-wrap">
        <div className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 md:mt-0">
          <div className="flex flex-row justify-between">
            <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
              Tutorial Add Language
            </h1>
          </div>
          <form 
          // action={createLanguage}
          >
            <div className="relative mb-4">
              <label
                htmlFor="language"
                className="leading-7 text-sm text-gray-400"
              >
                Language
              </label>
              <input
                type="text"
                id="language"
                name="language"
                className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
            <button
              type="submit"
              className="ml-auto text-white bg-indigo-500 border-0 py-2 px-4 focus:outline-none hover:bg-indigo-600 rounded"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TutorialList;
