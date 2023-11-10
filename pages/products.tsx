import Layout from '../components/Layout';
import Head from 'next/head';
import { BLOG_NAME } from '../lib/constants';
import PageHeader from '../components/PageHeader';
import { getAllProducts } from '../lib/Blog/product-lib';
import { Products } from '../types/product-type';
import ProductHexGrid from '../components/ProductHexGrid';

export async function getStaticProps() {
  const { name, description, products } = await getAllProducts();

  return {
    props: {
      name,
      description,
      products,
    },
  };
}

export default function RepositoriesPage({ name, description, products }: Products) {
  return (
    <Layout>
      <Head>
        <title>{`Our Repositories | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={name || 'Our Repositories'} description={description} />
      <ProductHexGrid products={products} />
    </Layout>
  );
}
