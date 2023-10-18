import React from "react";

const createPost = async (formData: FormData) => {
  "use server";

  const title = formData.get("title");
  const description = formData.get("description");
  const author = formData.get("author");
  const slug = formData.get("slug");
  const content = formData.get("content");

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcreate`, {
    method: "POST",
    body: JSON.stringify({ description, author, content, title, slug }),
    headers: { "content-type": "application/json" },
    next: {
      tags: ["blogPostAdd"],
    },
  });
  const result = await res.json();
  if (result) {
    // revalidateTag("tutorialAdd");
  }
};

const BlogCreate = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <section className="text-gray-400 bg-gray-900 body-font overflow-auto">
          <div className="container mx-auto overflow-auto">
            <form
              action={createPost}
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
        </section>
      </div>
    </section>
  );
};

export default BlogCreate;
