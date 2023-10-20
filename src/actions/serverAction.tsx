"use server";

import { revalidateTag } from "next/cache";

// CREATE HEADING LIST
export const AddHeadingList = async (formData: any) => {
  // console.log(formData)
  const id = formData.get("id")?.toString();
  const headingId = formData.get("headingId")?.toString();
  const title = formData.get("title")?.toString();
  const slug = formData.get("slug")?.toString();
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistcreate/tutoriallistaddconcept/${id}`,
    {
      method: "POST",
      body: JSON.stringify({
        id: headingId,
        title: title,
        slug: slug,
      }),
      headers: { "content-type": "application/json" },
    }
  );
  const result = await res.json();
  if (result) {
    revalidateTag("change");
    return { success: true };
  }
};

// CREATE HEADING LIST ITEM ADD
export const createListAdd = async (formData: FormData) => {
  const heading = formData.get("heading");
  const title = formData.get("title");
  const slug = formData.get("slug");
  const langSlug = formData.get("id");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tutoriallistcreate/tutoriallistcreateHeading/${langSlug}`,
    {
      method: "POST",
      body: JSON.stringify({ heading, title, slug }),
      headers: { "content-type": "application/json" },
    }
  );
  const result = await res.json();
  if (result.success === true) {
    revalidateTag("change");
  }
};

// CREATE BLOG
export const createPostAction = async (formData: FormData) => {
  const title = formData.get("title");
  const description = formData.get("description");
  const author = formData.get("author");
  const slug = formData.get("slug");
  const content = formData.get("content");

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcreate`,
    {
      method: "POST",
      body: JSON.stringify({ description, author, content, title, slug }),
      headers: { "content-type": "application/json" },
    }
  );
  const result = await res.json();
  if (result.sucess === true) {
    revalidateTag("fetchblog");
  }
};
