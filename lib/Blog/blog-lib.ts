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
  const queryRecipe = `{
    data: sampleArticle (id: "${id}")
    {
      ${BLOG_QUERY}
    }
  }`;

  const data = await fetchAPI(queryRecipe);
  return data.data.data;
}

function extractBlogs({ data }: { data: BlogResults }) {
  return data.results.map((blog: Blog) => {
    return blog;
  });
}
