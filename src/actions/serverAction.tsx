"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

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

// GET BLOG
export const getBlog = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogget`, {
    method: "GET",
    cache: "no-cache",
    next: {
      tags: ["fetchBlogPost"],
    },
  });
  const result = await res.json();
  return result;
};

// CREATE BLOG
export const createPostAction = async (formData: FormData) => {
  const title = formData.get("title")?.toString();
  const description = formData.get("description")?.toString();
  const author = formData.get("author")?.toString();
  const slug = formData.get("slug")?.toString();
  const content = formData.get("content")?.toString();

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/blogcreate`,
    {
      method: "POST",
      body: JSON.stringify({ description, author, content, title, slug }),
      headers: { "content-type": "application/json" },
    }
  );
  const result = await res.json();
  if (result) {
    revalidateTag("fetchBlogPost");
    // return result;
    redirect('/admin/blog')
  }
};
