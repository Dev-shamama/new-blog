import { BlogUpdateForm } from "@/components/ClientComponents";
import React from "react";

const getBlog = async (slug: string) => {
  "use server";

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/blogget/${slug}`, {
    method: "GET",
    cache: "no-cache",
  });
  const result = await res.json();
  return result;
};

const BlogUpdate = async ({ params }: { params: any }) => {
  const data = await getBlog(params.slug);

  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <section className="text-gray-400 bg-gray-900 body-font overflow-auto">
          <div className="container mx-auto overflow-auto">
            <BlogUpdateForm {...data.data[0]} />
          </div>
        </section>
      </div>
    </section>
  );
};

export default BlogUpdate;
