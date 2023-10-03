import Blog, { BlogResults } from "../../types/blog-type";
import { fetchAPI } from "../Common/api";
import {
  BLOG_QUERY,
  ALL_BLOG_QUERY,
  ALL_FEATURED_BLOG_QUERY,
  ALL_NON_FEATURED_BLOG_QUERY,
} from "../../graphQl/Blog/blog-query";

export async function getAllBlogs(): Promise<Blog[]> {
  const data = await fetchAPI(`${ALL_BLOG_QUERY}`);
  return extractBlogs(data.data);
}

export async function getAllFeaturedBlogs(): Promise<Blog[]> {
  const data = await fetchAPI(`${ALL_FEATURED_BLOG_QUERY}`);
  return extractBlogs(data.data);
}

export async function getAllNonFeaturedBlogs(): Promise<Blog[]> {
  const data = await fetchAPI(`${ALL_NON_FEATURED_BLOG_QUERY}`);
  return extractBlogs(data.data);
}

export async function getBlogById(id: string): Promise<Blog> {
  const blogQuery = `{
    data: sampleArticle (id: "${id}")
    {
      ${BLOG_QUERY}
    }
  }`;

  const data = await fetchAPI(blogQuery);
  return data.data.data;
}

export async function getBlogsByRepository(repositoryId: string): Promise<Blog[]> {
  const blogs = await getAllBlogs();
  return blogs.filter(
    (blog) =>
      blog?.repositories?.results?.filter((repository) => repository?.id === repositoryId).length >
      0
  );
}

function extractBlogs({ data }: { data: BlogResults }) {
  return data.results.map((blog: Blog) => blog);
}
