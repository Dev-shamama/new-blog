"use client";

import Link from "next/link";
import { redirect, useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";

const ButtonHeadingUpdate = (props: any) => {
  const [show, setShow] = useState(true);
  const [heading, setHeading] = useState(props.heading);

  const buttonShow = () => {
    setShow(false);
  };

  const updateHeading = async () => {
    const res = await fetch(
      `http://localhost:3000/api/tutoriallistcreate/tutoriallistupdateHeading/${props.id}`,
      {
        method: "POST",
        body: JSON.stringify({ id: props.headingId, heading }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    if (result.success === true) {
      setShow(true);
    }
  };

  return (
    <>
      {show ? (
        <h1 className="my-6 text-2xl mr-3">{heading}</h1>
      ) : (
        <>
          <input type="text" hidden={true} readOnly value={props.id} />
          <input
            type="text"
            hidden={show}
            className="my-6 border border-gray-300 p-2 rounded-md w-full"
            onChange={(e) => setHeading(e.target.value)}
            value={heading}
          />
        </>
      )}

      {show ? (
        <span
          className="bg-indigo-400 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
          onClick={buttonShow}
        >
          Edit
        </span>
      ) : (
        <span
          className="bg-indigo-400 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
          onClick={updateHeading}
        >
          Update
        </span>
      )}
    </>
  );
};

const ButtonDelete = (props: any) => {
  const router = useRouter();
  const DeleteHeading = async () => {
    const res = await fetch(
      `http://localhost:3000/api/tutoriallistcreate/tutoriallistupdateHeading/${props.id}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: props.headingId,
        }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    if (result.success === true) {
      router.refresh();
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
      onClick={DeleteHeading}
    >
      Delete
    </button>
  );
};

const ButtonAdd = (props: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModelOpen = () => {
    setIsOpen(true);
  };

  const AddHeadingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3000/api/tutoriallistcreate/tutoriallistaddconcept/${props.id}`,
      {
        method: "POST",
        body: JSON.stringify({
          id: props.headingId,
          title,
          slug,
        }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    if (result) {
      router.refresh();
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer"
        onClick={ModelOpen}
      >
        Add
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-cyan-200 bg-opacity-20">
          <div className="modal-container">
            <div className="bg-gray-900 p-10 rounded-md shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Language Tutorial List Add
              </h2>
              <form
                onSubmit={AddHeadingList}
                className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 mb-10"
              >
                <input type="hidden" value={props.headingId} name="id" />

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
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

              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ButtonDeleteHeadingList = (props: any) => {
  const router = useRouter();
  const DeleteHeadingList = async () => {
    const res = await fetch(
      `http://localhost:3000/api/tutoriallistcreate/tutoriallistaddconcept/${props.slugId}`,
      {
        method: "DELETE",
        body: JSON.stringify({
          id: props.listId,
          headingId: props.headingId,
          contentSlug: props.contentSlug
        }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    if(result.success === true) {
      router.refresh()
    }
  };
  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer my-2"
      onClick={DeleteHeadingList}
    >
      Delete
    </button>
  );
};

const ButtonAddContent = (props: any) => {
  const router = useRouter();
  return (
    <Link
      href={`./${props.slugId}/${props.slug}`}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full cursor-pointer my-2"
    >
      Content
    </Link>
  );
};

const ButtonUpdateHeadingList = (props: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState(props.title);
  const [slug, setSlug] = useState(props.slug);

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModelOpen = () => {
    setIsOpen(true);
  };

  const UpdateHeadingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3000/api/tutoriallistcreate/tutoriallistupdate/${props.slugId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          contentSlug: props.contentSlug,
          headingId: props.headingId,
          listId: props.listId,
          title,
          slug,
        }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    if (result) {
      router.refresh();
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer my-2"
        onClick={ModelOpen}
      >
        Update
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-cyan-200 bg-opacity-20">
          <div className="modal-container">
            <div className="bg-gray-900 p-10 rounded-md shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Language Tutorial List Update
              </h2>
              <form
                onSubmit={UpdateHeadingList}
                className="bg-opacity-50 rounded-lg flex flex-col text-left md:ml-auto w-full mt-10 mb-10"
              >
                <input type="hidden" value={props.headingId} name="id" />

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
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Update
                </button>
              </form>

              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ButtonDeleteBlog = (props: any) => {
  const DeleteBlog = async (slug: any) => {
    if (confirm("Are You Sure?")) {
      const res = await fetch(
        `http://localhost:3000/api/blogoperation/${slug}`,
        {
          method: "DELETE",
          cache: "no-cache",
        }
      );
      const result = await res.json();
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white  py-1 px-2 rounded-sm cursor-pointer"
      onClick={() => DeleteBlog(props.id)}
    >
      Delete
    </button>
  );
};

const BlogUpdateForm = (props: any) => {
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [author, setAuthor] = useState(props.author);
  const [slug, setSlug] = useState(props.slug);
  const [content, setContent] = useState(props.content);
  const [id, setId] = useState(props._id);

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(`http://localhost:3000/api/blogoperation/${id}`, {
      method: "PUT",
      body: JSON.stringify({ description, author, content, title, slug }),
      headers: { "content-type": "application/json" },
      // next: {
      //   tags: ["blogPostAdd"],
      // },
    });
    const result = await res.json();
    if (result) {
      // revalidateTag("tutorialAdd");
    }
  };

  return (
    <form
      onSubmit={updatePost}
      className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full"
    >
      <input type="hidden" value={id} name="id" />
      <div className="flex flex-row justify-between">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
          Update Blog Post
        </h1>
      </div>

      <div className="relative mb-4">
        <label htmlFor="title" className="leading-7 text-sm text-gray-400">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>

      <div className="relative mb-4">
        <label htmlFor="author" className="leading-7 text-sm text-gray-400">
          Author
        </label>
        <input
          type="text"
          id="author"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
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
          value={slug}
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          onChange={(e) => setSlug(e.target.value)}
        />
      </div>

      <div className="py-2 w-full">
        <div className="relative">
          <label htmlFor="content" className="leading-7 text-sm text-gray-400">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-y leading-6 transition-colors duration-200 ease-in-out"
            onChange={(e) => setContent(e.target.value)}
          >
            {content}
          </textarea>
        </div>
      </div>

      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Update Post
      </button>
    </form>
  );
};

const ButtonLanguageUpdate = (props: any) => {
  const router = useRouter();
  const [language, setLanguage] = useState(props.language);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModelOpen = () => {
    setIsOpen(true);
  };

  const UpdateHeadingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await fetch(
      `http://localhost:3000/api/tutoriallistcreate/${props.langId}`,
      {
        method: "PUT",
        body: JSON.stringify({
          language: language,
        }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    if (result.success == true) {
      router.refresh();
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer my-2"
        onClick={ModelOpen}
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-cyan-200 bg-opacity-20">
          <div className="modal-container">
            <div className="bg-gray-900 p-10 rounded-md shadow-lg">
              <h2 className="text-2xl font-bold mb-4">
                Language Tutorial List Update
              </h2>
              <form
                onSubmit={UpdateHeadingList}
                className="bg-opacity-50 rounded-lg flex flex-col text-left md:ml-auto w-full mt-10 mb-10"
              >
                <input type="hidden" value={props.headingId} name="id" />

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
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <button
                  type="submit"
                  className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                >
                  Update
                </button>
              </form>

              <button
                onClick={closeModal}
                className="bg-red-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ButtonLanguageDelete = (props: any) => {
  const router = useRouter();
  const DeleteLanguage = async (slug: any) => {
    if (confirm("Are You Sure?")) {
      const res = await fetch(
        `http://localhost:3000/api/tutoriallistcreate/${slug}`,
        {
          method: "DELETE",
        }
      );
      const result = await res.json();
      if (result.success === true) {
        router.refresh();
      }
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white  font-bold py-2 px-4 rounded-full cursor-pointer my-2"
      onClick={() => DeleteLanguage(props.langId)}
    >
      Delete
    </button>
  );
};

export {
  ButtonHeadingUpdate,
  ButtonDelete,
  ButtonAdd,
  ButtonDeleteHeadingList,
  ButtonAddContent,
  ButtonUpdateHeadingList,
  ButtonLanguageUpdate,
  ButtonDeleteBlog,
  BlogUpdateForm,
  ButtonLanguageDelete,
};
