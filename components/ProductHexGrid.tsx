import Link from 'next/link';
import Product from '../types/product-type';

export default function ProductHexGrid({ products }: { products: Product[] }) {
  return (
    <section className="product-hex-grid container">
      <ul className="product-hex-grid hex-grid__list">
        {products.map((product) => (
          <li className="hex-grid__item" key={product.id}>
            <div className="hex-grid__content">
              <Link href={`/products/${product.id}`}>
                <h3>{product.name}</h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
