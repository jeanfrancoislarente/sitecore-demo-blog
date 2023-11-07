import AuthorAvatar from './AuthorAvatar';
import Link from 'next/link';
import Author from '../types/author-type';
import Repository from '../types/repository-type';
import Product from '../types/product-type';
import Image from 'next/image';

type PostBodySidebarProps = {
  author: Author;
  repositories: Repository[];
  products: Product[];
};

export default function PostBodySidebar({ author, repositories, products }: PostBodySidebarProps) {
  return (
    <aside className="post-body-sidebar">
      <div className="post-body-sidebar-inner">
        <Link href={`/team/${author.id}`} className="post-body-sidebar-author">
          <AuthorAvatar
            name={author?.authorName}
            picture={author?.authorFace.results[0].fileUrl}
            jobTitle={author?.jobTitle}
          />
        </Link>
        {products && products.length > 0 && (
          <div className="post-body-sidebar-products">
            <hr />
            <h6>Related products:</h6>
            <ul>
              {products.map((product) => (
                <li key={product.id}>
                  <Link href={`/products/${product.id}`}>
                    <Image
                      src={product.logo.results[0].fileUrl}
                      width={32}
                      height={36}
                      alt={product.name}
                    />
                    <span>{product.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
        {repositories && repositories.length > 0 && (
          <div className="post-body-sidebar-repositories">
            <hr />
            <h6>Related repositories:</h6>
            <ul>
              {repositories.map((repository) => (
                <li key={repository.id}>
                  <Link href={`/repositories/${repository.id}`}>{repository.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </aside>
  );
}
