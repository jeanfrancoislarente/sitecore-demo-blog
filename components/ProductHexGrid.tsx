import Link from 'next/link';
import Product from '../types/product-type';
import { useMemo, useState } from 'react';
import Image from 'next/image';

export default function ProductHexGrid({ products }: { products: Product[] }) {
  const [isMouseInside, setIsMouseInside] = useState(false);

  const productsWithGaps: (Product | null)[] = useMemo(
    () => [
      null,
      null,
      ...products.slice(0, 1),
      null,
      ...products.slice(1, 2),
      null,
      ...products.slice(2, 8),
      null,
      ...products.slice(8, 9),
      null,
      ...products.slice(9, 10),
      null,
      ...products.slice(10),
    ],
    [products]
  );

  return (
    <section className="product-hex-grid">
      <ul className={`product-hex-grid-list ${isMouseInside ? 'hover' : ''}`}>
        {productsWithGaps.map((product, i) => {
          const isRealProduct = !!product;
          const id = isRealProduct ? product.id : i;
          const name = isRealProduct ? product.name : '';
          const logoSrc = isRealProduct ? product?.logo.results[0].fileUrl : '';
          const productGroup = isRealProduct
            ? product.productGroup?.results[0]?.id.replace('taxonomy_productGroups_', '')
            : '';

          return (
            <li
              className="product-hex-grid-item"
              key={id}
              onMouseEnter={() => {
                isRealProduct && setIsMouseInside(true);
              }}
              onMouseLeave={() => {
                isRealProduct && setIsMouseInside(false);
              }}
            >
              {isRealProduct && (
                <Link
                  href={`/products/${id}`}
                  className={`product-hex-grid-content ${productGroup}`}
                >
                  <Image src={logoSrc} alt={name} width={32} height={32} />
                  <h5>{name}</h5>
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
