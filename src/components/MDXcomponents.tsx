import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeCodeTitles from "rehype-code-titles";
import rehypePrism from "rehype-prism-plus";

export function MDXComponents(children: any) {
  const components = {
    h1: (props: any) => (
      <h1 {...props} className="my-[24px] text-3xl text-indigo-500">
        {props.children}
      </h1>
    ),
    h2: (props: any) => (
      <h1 {...props} className="my-[24px] text-2xl text-indigo-500">
        {props.children}
      </h1>
    ),
    li: (props: any) => (
      <li {...props} className="list-disc my-2 text-gray-300">
        {props.children}
      </li>
    ),
    ul: (props: any) => (
      <ul {...props} className="ml-10 text-slate-800">
        {props.children}
      </ul>
    ),
    p: (props: any) => (
      <p {...props} className="my-4 text-base text-gray-300">
        {props.children}
      </p>
    ),
    strong: (props: any) => (
      <strong {...props} className="my-4 text-base text-indigo-500">
        {props.children}
      </strong>
    ),
    img: (props: any) => (
      <img {...props}  className="my-4 items-center">
        {props.children}
      </img>
    ),
    
  };

  return (
    <>
      <MDXRemote
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeCodeTitles, rehypePrism],
          },
        }}
        {...children}
        components={components}
      />
    </>
  );
}
