import Product from '../types/product-type';
import ProductPreview from './ProductPreview';

type MoreProductsProps = {
  products: Product[];
  title: string;
  className?: string;
};

export default function MoreProducts({ products, title, className }: MoreProductsProps) {
  return (
    <section className={`more-products ${className ? className : ''}`}>
      <h2 className="more-products-title">{title}</h2>
      <div className="more-products-list">
        {products.map((product) => (
          <ProductPreview key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
