import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import MoreStories from '../../components/MoreStories';
import Layout from '../../components/Layout';
import { BLOG_NAME } from '../../lib/constants';
import Blog from '../../types/blog-type';
import { getBlogsByProduct } from '../../lib/Blog/blog-lib';
import PageHeader from '../../components/PageHeader';
import { getAllProducts, getProductById } from '../../lib/Blog/product-lib';
import Product from '../../types/product-type';
import { useMemo } from 'react';
import Image from 'next/image';
import { MultiActionButton } from '../../components/Buttons';
import { faDesktop, faExternalLink, faGlobe } from '@fortawesome/free-solid-svg-icons';

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const [product, posts] = await Promise.all([
    getProductById(params.slug),
    getBlogsByProduct(params.slug),
  ]);

  return {
    props: {
      product,
      posts,
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 10, //in seconds
  };
}

export async function getStaticPaths() {
  const allProducts = await getAllProducts();

  return {
    paths: allProducts.products.map((product) => {
      return {
        params: {
          slug: product.id,
        },
      };
    }),
    fallback: 'blocking',
  };
}

type Props = {
  product: Product;
  posts: Blog[];
};

export default function ProductsPage({ product, posts }: Props) {
  const router = useRouter();
  const logo = useMemo(() => product.logo.results[0], [product.logo.results]);

  const headerTitle = useMemo(
    () => (
      <>
        <Image
          src={logo.fileUrl}
          alt={product.name}
          width={Number(logo.fileWidth)}
          height={Number(logo.fileHeight)}
        />
        {product.name}
      </>
    ),
    [logo.fileHeight, logo.fileUrl, logo.fileWidth, product.name]
  );

  if (!product || (!router.isFallback && !product?.id)) {
    return <ErrorPage statusCode={404} />;
  }

  return (
    <Layout>
      <Head>
        <title>{`${product.name} | ${BLOG_NAME}`}</title>
      </Head>
      <PageHeader title={headerTitle} description={product.description} className="product-header">
        <MultiActionButton
          label="Discover"
          icon={faGlobe}
          actions={[
            {
              label: 'Get a demo',
              href: product.getDemoLink,
              icon: faDesktop,
            },
            {
              label: 'Explore product',
              href: product.exploreProductLink,
              icon: faExternalLink,
            },
          ]}
        />
      </PageHeader>
      {posts && posts.length > 0 && <MoreStories posts={posts} title="Related posts" />}
    </Layout>
  );
}
