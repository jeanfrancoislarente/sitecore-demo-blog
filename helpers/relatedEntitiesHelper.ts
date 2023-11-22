import Blog from '../types/blog-type';
import Product from '../types/product-type';
import Repository from '../types/repository-type';

type Entity = Product | Repository;

export const addHrefToItems = (items: Entity[], path: string) =>
  items.map((item) => ({ ...item, href: `/${path}/${item.id}` }));

export const fetchRelatedPosts = async (
  items: Entity[],
  getPostsByItem: (id: string) => Promise<Blog[]>
) => Promise.all(items.map((item) => getPostsByItem(item.id)));

export const createRelatedEntity = (
  item: Entity,
  path: string,
  relatedPosts: Blog[],
  currentPostId: string
) => ({
  id: item.id,
  name: item.name,
  href: `/${path}/${item.id}`,
  relatedPosts: relatedPosts.filter((post) => post.id !== currentPostId),
});
