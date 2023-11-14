import Image from 'next/image';
import Product from '../types/product-type';
import Link from 'next/link';

export default function ProductPreview(product: Product) {
  return (
    <article className="product-preview">
      <Link href={`/products/${product.id}`}>
        <div className="product-preview-logo">
          <Image src={product.logo.results[0].fileUrl} alt={product.name} height={32} width={55} />
          <hr />
        </div>
        <h3 className="product-preview-title">{product.name}</h3>
        <p className="product-preview-summary">{product.description}</p>
      </Link>
    </article>
  );
}
