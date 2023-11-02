import Product from '../types/product-type';
import Image from 'next/image';

export default function PostProductsList({ products }: { products: Product[] }) {
  return (
    <ul className="post-products-list">
      {products.map((product) => (
        <li key={product.id}>
          <Image src={product.logo.results[0].fileUrl} width={32} height={36} alt={product.name} />
          <span>{product.name}</span>
        </li>
      ))}
    </ul>
  );
}
