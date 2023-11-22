import Layout from '../components/Layout';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import PageHeader from '../components/PageHeader';
import { getAllProducts } from '../lib/Blog/product-lib';
import { Products } from '../types/product-type';
import ProductHexGrid from '../components/ProductHexGrid';
import MoreProducts from '../components/MoreProducts';
import { useMemo } from 'react';

export async function getStaticProps() {
  const { name, description, products, otherProducts } = await getAllProducts();

  return {
    props: {
      name,
      description,
      products,
      otherProducts,
    },
  };
}

export default function ProductsPage({ name, description, products, otherProducts }: Products) {
  const saasProductsInGroups = useMemo(() => {
    const contentCloud = products.filter((product) =>
      product.productGroup.results[0].id.includes('contentCloud')
    );

    const engagementCloud = products.filter((product) =>
      product.productGroup.results[0].id.includes('engagementCloud')
    );

    const commerceCloud = products.filter((product) =>
      product.productGroup.results[0].id.includes('commerceCloud')
    );

    return {
      contentCloud,
      engagementCloud,
      commerceCloud,
    };
  }, [products]);

  return (
    <Layout>
      <Head>
        <title>{`Products | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={name || 'Products'} description={description} />
      <ProductHexGrid products={products} />
      <MoreProducts
        title="Content Cloud"
        products={saasProductsInGroups.contentCloud}
        className="hex-grid-replacement"
      />
      <MoreProducts
        title="Engagement Cloud"
        products={saasProductsInGroups.engagementCloud}
        className="hex-grid-replacement"
      />
      <MoreProducts
        title="Commerce Cloud"
        products={saasProductsInGroups.commerceCloud}
        className="hex-grid-replacement"
      />
      <MoreProducts title="Platform DXP" products={otherProducts} />
    </Layout>
  );
}
