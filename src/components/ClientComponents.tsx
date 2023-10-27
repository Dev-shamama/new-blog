"use client";
import { cookies } from "next/headers";
import {
  ContactValidateSchema,
  AddLanguageValidateSchema,
  ListHeadingValidateSchema,
  ListHeadingChildrenValidateSchema,
  BlogValidateSchema,
} from "@/validator/Validator";
import { Chat, FaceBook, Instagram, Twitter } from "./Icon";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "@/context/AuthContext";

// LIST HEADING UPDATE
const ButtonHeadingUpdate = (props: any) => {
  const [show, setShow] = useState(true);
  const [heading, setHeading] = useState(props.heading);

  const [buttonState, setButtonState] = useState("Update");
  const [isDisable, setIsDisable] = useState(false);

  const buttonShow = () => {
    setShow(false);
  };

  const updateHeading = async () => {
    setButtonState("Loading...");
    setIsDisable(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/listheading/listheadingupdate?slug=${props.id}`,
      {
        method: "PUT",
        body: JSON.stringify({ id: props.headingId, heading }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    setButtonState("Update");
    setIsDisable(false);
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
        <button
          className="bg-indigo-400 text-white font-semibold py-2 px-4 rounded-full cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500"
          onClick={updateHeading}
          disabled={isDisable}
        >
          {buttonState}
        </button>
      )}
    </>
  );
};

// LIST HEADING DELETE
const ButtonDelete = (props: any) => {
  const router = useRouter();
  const DeleteHeading = async () => {
    if (confirm("Are You Sure ?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/listheading/listheadingdelete?slug=${props.id}`,
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

// LIST HEADING ADD
const ButtonAdd = (props: any) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [buttonState, setButtonState] = useState("Add");
  const [isDisable, setIsDisable] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModelOpen = () => {
    setIsOpen(true);
  };

  const AddHeadingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, value }: { error: any; value: any } =
      ListHeadingChildrenValidateSchema.validate({
        title,
        slug,
      });

    const slugModify = value.slug.split(" ").join("-");

    if (error !== undefined) {
      toast.error(error.message);
    } else {
      setButtonState("Loading...");
      setIsDisable(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/listheading/listheadingchildrencreate?slug=${props.id}`,
        {
          method: "POST",
          body: JSON.stringify({
            id: props.headingId,
            title: value.title,
            slug: slugModify,
          }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      setButtonState("Add");
      setIsDisable(false);
      if (result.success === false) {
        toast.error(result.message);
      } else if (result.success === true) {
        toast.success(result.message);
        router.refresh();
        setIsOpen(false);
      }
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
                className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 mb-10"
                onSubmit={AddHeadingList}
              >
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
                  disabled={isDisable}
                  className=" bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
                >
                  {buttonState}
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

// LIST HEADING DELETE
const ButtonDeleteHeadingList = (props: any) => {
  const router = useRouter();
  const DeleteHeadingList = async () => {
    if (confirm("Are You Sure ?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/listheading/listheadingchildrendelete?slug=${props.slugId}`,
        {
          method: "DELETE",
          body: JSON.stringify({
            id: props.listId,
            headingId: props.headingId,
            contentSlug: props.contentSlug,
          }),
          headers: { "content-type": "application/json" },
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
      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-full cursor-pointer my-2"
      onClick={DeleteHeadingList}
    >
      Delete
    </button>
  );
};

const ButtonAddContent = (props: any) => {
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

  const [buttonState, setButtonState] = useState("Update");
  const [isDisable, setIsDisable] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModelOpen = () => {
    setIsOpen(true);
  };

  const UpdateHeadingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("Loading...");
    setIsDisable(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/listheading/listheadingchildrenupdate?slug=${props.slugId}`,

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
    setButtonState("Update");
    setIsDisable(false);
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
                  disabled={isDisable}
                  className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
                >
                  {buttonState}
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

const ButtonDeleteBlog = ({ id }: { id: string }) => {
  const router = useRouter();
  const DeleteBlog = async () => {
    if (confirm("Are You Sure?")) {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogdelete?id=${id}`,
        {
          method: "GET",
        }
      );
      const result = await res.json();
      if (result) {
        toast.success(result.message);
        router.refresh();
      }
    }
  };

  return (
    <button
      className="bg-red-500 hover:bg-red-600 text-white  py-1 px-2 rounded-sm cursor-pointer"
      onClick={() => DeleteBlog()}
    >
      Delete
    </button>
  );
};

const BlogUpdateForm = (props: any) => {
  const router = useRouter();
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [author, setAuthor] = useState(props.author);
  const [slug, setSlug] = useState(props.slug);
  const [content, setContent] = useState(props.content);
  const [status, setStatus] = useState(props.status);

  const [id, setId] = useState(props._id);

  const [buttonState, setButtonState] = useState("Update Post");
  const [isDisable, setIsDisable] = useState(false);

  const updatePost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("Loading...");
    setIsDisable(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogupdate?id=${id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          description,
          author,
          content,
          title,
          slug,
          status,
        }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    setButtonState("Update Post");
    setIsDisable(false);
    if (result) {
      toast.success(result.message);
      router.refresh();
      router.push("/admin/blog");
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
        <label
          className="leading-7 text-sm text-gray-400"
          htmlFor="selectField"
        >
          Author
        </label>
        <select
          onChange={(e) => setAuthor(e.target.value)}
          id="selectField"
          name="selectField"
          className="text-base leading-8 block w-full py-3 px-3 bg-gray-600 border-gray-300 focus:outline-none focus:ring-indigo-900 focus:border-indigo-600 sm:text-sm rounded-md"
          value={author}
        >
          <option value="">Select Author</option>
          <option value="SHAMAMA-BIN-SHAKIL">SHAMAMA-BIN-SHAKIL</option>
          <option value="USMAN">USMAN</option>
        </select>
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

      <div className="relative mb-4">
        <label
          className="leading-7 text-sm text-gray-400"
          htmlFor="selectField"
        >
          Status (Public / Private)
        </label>
        <select
          onChange={(e) => setStatus(e.target.value)}
          id="selectField"
          name="selectField"
          className="text-base leading-8 block w-full py-3 px-3 bg-gray-600 border-gray-300 focus:outline-none focus:ring-indigo-900 focus:border-indigo-600 sm:text-sm rounded-md"
          value={status}
        >
          <option value="">Select Status</option>
          <option value="PUBLIC">PUBLIC</option>
          <option value="PRIVATE">PRIVATE</option>
        </select>
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
        disabled={isDisable}
        className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
      >
        {buttonState}
      </button>
    </form>
  );
};

const ButtonLanguageUpdate = (props: any) => {
  const router = useRouter();
  const [language, setLanguage] = useState(props.language);
  const [buttonState, setButtonState] = useState("Update");
  const [isDisable, setIsDisable] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const ModelOpen = () => {
    setIsOpen(true);
  };

  const UpdateHeadingList = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error }: { error: any } = AddLanguageValidateSchema.validate({
      language,
    });
    if (error !== undefined) {
      toast.error(error.message);
    } else {
      setButtonState("Loading...");
      setIsDisable(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/languageupdate?id=${props.langId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            language: language.toLowerCase(),
          }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      setButtonState("Update");
      setIsDisable(false);
      if (result.success == true) {
        router.refresh();
        setIsOpen(false);
      }
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
                  disabled={isDisable}
                  className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
                >
                  {buttonState}
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
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/languagedelete?id=${slug}`,
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

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const contactPostHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error }: { error: any } = ContactValidateSchema.validate({
      name,
      email,
      message,
    });

    if (error !== undefined) {
      toast.error(error.message);
    } else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/contact/contactcreate`,
        {
          method: "POST",
          body: JSON.stringify({ name, email, message }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      if (result.success === true) {
        toast.success(result.message);
        setName("");
        setEmail("");
        setMessage("");
      }
    }
  };

  return (
    <>
      <form onSubmit={contactPostHandler} className="lg:w-1/2 md:w-2/3 mx-auto">
        <div className="flex flex-wrap -m-2">
          <div className="p-2 w-1/2">
            <div className="relative">
              <label htmlFor="name" className="leading-7 text-sm text-gray-400">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-1/2">
            <div className="relative">
              <label
                htmlFor="email"
                className="leading-7 text-sm text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              />
            </div>
          </div>
          <div className="p-2 w-full">
            <div className="relative">
              <label
                htmlFor="message"
                className="leading-7 text-sm text-gray-400"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              ></textarea>
            </div>
          </div>
          <div className="p-2 w-full">
            <button
              className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
            >
              Submit
            </button>
          </div>
          <div className="p-2 w-full pt-8 mt-8 border-t border-gray-800 text-center">
            <a className="text-indigo-400">rohishamama@gmail.com</a>
            <br />
            <br />
            <span className="inline-flex">
              <a className="text-gray-500">
                <FaceBook />
              </a>
              <a className="ml-4 text-gray-500">
                <Twitter />
              </a>
              <a className="ml-4 text-gray-500">
                <Instagram />
              </a>
              <a className="ml-4 text-gray-500">
                <Chat />
              </a>
            </span>
          </div>
        </div>
      </form>
    </>
  );
};

const CreateBlogPost = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");

  const [buttonState, setButtonState] = useState("Post");
  const [isDisable, setIsDisable] = useState(false);

  const createPost = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, value }: { error: any; value: any } =
      BlogValidateSchema.validate({
        title,
        description,
        author,
        slug,
        content,
        status,
      });

    const slugModify = value.slug.split(" ").join("-");
    const authorModify = value.author.split(" ").join("");

    if (error !== undefined) {
      toast.error(error.message);
    } else {
      setButtonState("Loading...");
      setIsDisable(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/blog/blogcreate`,
        {
          method: "POST",
          body: JSON.stringify({
            description,
            author: authorModify,
            content,
            title,
            slug: slugModify,
            status,
          }),
        }
      );
      const result = await res.json();
      setButtonState("Post");
      setIsDisable(false);
      if (result.success === false) {
        toast.error(result.message);
      } else if (result.success === true) {
        router.refresh();
        toast.success(result.message);
      }
    }
  };

  return (
    <>
      <form
        onSubmit={createPost}
        className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full"
      >
        <div className="flex flex-row justify-between">
          <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
            New Blog Post
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
          <label
            className="leading-7 text-sm text-gray-400"
            htmlFor="selectField"
          >
            Author
          </label>
          <select
            onChange={(e) => setAuthor(e.target.value)}
            id="selectField"
            name="selectField"
            className="text-base leading-8 block w-full py-3 px-3 bg-gray-600 border-gray-300 focus:outline-none focus:ring-indigo-900 focus:border-indigo-600 sm:text-sm rounded-md"
          >
            <option value="">Select Author</option>
            <option value="SHAMAMA-BIN-SHAKIL">SHAMAMA-BIN-SHAKIL</option>
            <option value="USMAN">USMAN</option>
          </select>
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
            onChange={(e) => setSlug(e.target.value)}
            className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          />
        </div>

        <div className="relative mb-4">
          <label
            className="leading-7 text-sm text-gray-400"
            htmlFor="selectField"
          >
            Status (Public / Private)
          </label>
          <select
            onChange={(e) => setStatus(e.target.value)}
            id="selectField"
            name="selectField"
            className="text-base leading-8 block w-full py-3 px-3 bg-gray-600 border-gray-300 focus:outline-none focus:ring-indigo-900 focus:border-indigo-600 sm:text-sm rounded-md"
          >
            <option value="">Select Status</option>
            <option value="PUBLIC">PUBLIC</option>
            <option value="PRIVATE">PRIVATE</option>
          </select>
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
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full bg-gray-800 bg-opacity-40 rounded border border-gray-700 focus:border-indigo-500 focus:bg-gray-900 focus:ring-2 focus:ring-indigo-900 h-32 text-base outline-none text-gray-100 py-1 px-3 resize-y leading-6 transition-colors duration-200 ease-in-out"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={isDisable}
          className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
        >
          {buttonState}
        </button>
      </form>
    </>
  );
};

const TutorialLanguage = () => {
  const router = useRouter();
  const [language, setLanguage] = useState("");

  const [buttonState, setButtonState] = useState("Add");
  const [isDisable, setIsDisable] = useState(false);

  const createLanguage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, value }: { error: any; value: any } =
      AddLanguageValidateSchema.validate({
        language,
      });
    if (error !== undefined) {
      toast.error(error.message);
    } else {
      setButtonState("Loading...");
      setIsDisable(true);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/languagecreate`,
        {
          method: "POST",
          body: JSON.stringify({ language: value.language }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      setButtonState("Add");
      setIsDisable(false);
      if (result.success === true) {
        router.refresh();
        router.push("/admin/tutoriallist");
      }
    }
  };
  return (
    <form onSubmit={createLanguage}>
      <div className="relative mb-4">
        <label htmlFor="language" className="leading-7 text-sm text-gray-400">
          Language
        </label>
        <input
          type="text"
          id="language"
          name="language"
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        />
      </div>
      <button
        type="submit"
        disabled={isDisable}
        className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
      >
        {buttonState}
      </button>
    </form>
  );
};

const LanguageListHeadingCreate = ({ paramSlug }: { paramSlug: string }) => {
  const router = useRouter();
  const [heading, setHeading] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");

  const [buttonState, setButtonState] = useState("Add");
  const [isDisable, setIsDisable] = useState(false);

  const createListAdd = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error, value }: { error: any; value: any } =
      ListHeadingValidateSchema.validate({
        heading,
        title,
        slug,
      });

    const slugModify = value.slug.split(" ").join("-");

    if (error !== undefined) {
      toast.error(error.message);
    } else {
      setButtonState("Loading...");
      setIsDisable(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/listheading/listheadingcreate?slug=${paramSlug}`,
        {
          method: "POST",
          body: JSON.stringify({ heading, title, slug: slugModify }),
          headers: { "content-type": "application/json" },
        }
      );
      const result = await res.json();
      setButtonState("Add");
      setIsDisable(false);
      if (result.success === true) {
        router.refresh();
      }
    }
  };

  return (
    <form
      onSubmit={createListAdd}
      className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 mb-10"
    >
      <div className="flex flex-row justify-between">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
          Language Tutorial List Add
        </h1>
      </div>

      <div className="relative mb-4">
        <label htmlFor="heading" className="leading-7 text-sm text-gray-400">
          Heading
        </label>
        <input
          type="text"
          id="heading"
          name="heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)}
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
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
        <label htmlFor="slug" className="leading-7 text-sm text-gray-400">
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
        disabled={isDisable}
        className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
      >
        {buttonState}
      </button>
    </form>
  );
};

const ContentCreate = ({
  contentSlug,
  itemContent,
}: {
  contentSlug: string;
  itemContent: string;
}) => {
  const router = useRouter();
  const [content, setContent] = useState(itemContent);
  const [buttonState, setButtonState] = useState("Add / Update");
  const [isDisable, setIsDisable] = useState(false);

  const createContent = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButtonState("Loading...");
    setIsDisable(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutorial/tutorialcontent/contentcreate`,
      {
        method: "POST",
        body: JSON.stringify({ content, slugTitle: contentSlug }),
        headers: { "content-type": "application/json" },
      }
    );
    const result = await res.json();
    setButtonState("Add / Update");
    setIsDisable(false);
    if (result) {
      router.refresh();
    }
  };
  return (
    <form
      onSubmit={createContent}
      className="bg-opacity-50 rounded-lg flex flex-col md:ml-auto w-full mt-10 mb-10"
    >
      <div className="flex flex-row justify-between">
        <h1 className="sm:text-4xl text-3xl font-medium title-font mb-2 text-white">
          Add Content
        </h1>
      </div>

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
            value={content}
            onChange={(e) => setContent(e.target.value)}
          >
            {itemContent}
          </textarea>
        </div>
      </div>

      <button
        type="submit"
        disabled={isDisable}
        className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
      >
        {buttonState}
      </button>
    </form>
  );
};

const LoginForm = () => {
  const auth = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [buttonState, setButtonState] = useState("Login");
  const [isDisable, setIsDisable] = useState(false);

  const LoginHandler = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setButtonState("Loading...");
    setIsDisable(true);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    const result = await res.json();
    setButtonState("Login");
    setIsDisable(false);

    if (result.success === true) {
      localStorage.setItem("token", result.token);
      auth?.Login();
      auth?.setToken(result.token)
      toast.success(result.message);
    }
  };

  return (
    <form
      className="lg:w-2/6 md:w-1/2 bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0"
      onSubmit={LoginHandler}
    >
      <h2 className="text-white text-lg font-medium title-font mb-5">
        Sign In
      </h2>
      <div className="relative mb-4">
        <label htmlFor="email" className="leading-7 text-sm text-gray-400">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="password" className="leading-7 text-sm text-gray-400">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-indigo-900 rounded border border-gray-600 focus:border-indigo-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <button
        type="submit"
        disabled={isDisable}
        className="bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-blue-500 text-white font-semibold"
      >
        {buttonState}
      </button>
    </form>
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
  ContactForm,
  CreateBlogPost,
  TutorialLanguage,
  LanguageListHeadingCreate,
  ContentCreate,
  LoginForm,
};
