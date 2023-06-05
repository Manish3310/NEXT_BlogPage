import { getBlogBySlug, getBlogs } from "@/lib/blogs";
import { NextPage } from "next";
import { type } from "os";
import { ParsedUrlQuery } from "querystring";
import { use } from "react";
import BlogHeader from "./BlogHeader";

interface Params extends ParsedUrlQuery {
    slug:string
}

type Props={
    params:Params
}

const getInitialBlogs=async(slug:string)=>{
    const blog=getBlogBySlug(slug);
    return blog;
}

const BlogDetail:NextPage<Props> = ({params}) => {
    const blog=use(getInitialBlogs(params.slug));
    return ( 
        <div className="w-2/3 m-auto ">
            <BlogHeader blog={blog}/>
            <article className="prose prose-xl lg:">
                <div dangerouslySetInnerHTML={{__html:blog.content}}/>
            </article>
        </div>
    )
}

 export function generateStaticParams(){
    const blogs=getBlogs();
    return blogs.map(blog=>({
        slug:blog.slug
    }));

}
 
export default BlogDetail;