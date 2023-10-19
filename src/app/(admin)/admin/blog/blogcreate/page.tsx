import { CreateBlogPost } from "@/components/ClientComponents";
import React from "react";

const BlogCreate = () => {
  return (
    <section className="text-gray-400 bg-gray-900 body-font overflow-hidden">
      <div className="container px-5 py-10 mx-auto">
        <section className="text-gray-400 bg-gray-900 body-font overflow-auto">
          <div className="container mx-auto overflow-auto">
           <CreateBlogPost />
          </div>
        </section>
      </div>
    </section>
  );
};

export default BlogCreate;
