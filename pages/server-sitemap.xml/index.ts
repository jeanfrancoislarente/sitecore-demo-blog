import { ISitemapField, getServerSideSitemapLegacy } from "next-sitemap";
import { GetServerSideProps } from "next";
import { getAllBlogs } from "../../lib/Blog/blog-lib";
import { getAllRepositories } from "../../lib/Blog/repository-lib";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  // Method to source urls from cms
  const [allBlogs, repos] = await Promise.all([getAllBlogs(), getAllRepositories()]);

  const fields: ISitemapField[] = [
    ...allBlogs.map((blog) => {
      return {
        loc: `https://blog.sitecoredemo.com/posts/${blog.id}`,
        lastmod: blog.lastUpdateDate
          ? new Date(blog.lastUpdateDate).toISOString()
          : new Date().toISOString(),
      };
    }),
    ...repos.map((repository) => {
      return {
        loc: `https://blog.sitecoredemo.com/repositories/${repository.id}`,
        lastmod: repository.lastUpdateDate
          ? new Date(repository.lastUpdateDate).toISOString()
          : new Date().toISOString(),
      };
    }),
  ];

  return getServerSideSitemapLegacy(ctx, fields);
};

// Default export to prevent next.js errors
// eslint-disable-next-line @typescript-eslint/no-empty-function
export default function Sitemap() {}
