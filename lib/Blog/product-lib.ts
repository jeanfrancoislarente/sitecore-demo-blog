import { fetchAPI } from '../Common/api';
import PRODUCT_QUERY, { PRODUCTS_QUERY } from '../../graphQl/Blog/product-query';
import Product, { Products } from '../../types/product-type';

export async function getAllProducts(): Promise<Products> {
  const data = await fetchAPI(`${PRODUCTS_QUERY}`);
  console.log(data.data.data.products.results);
  return {
    name: data.data.data.name,
    description: data.data.data.description,
    products: data.data.data.products.results,
  };
}

export async function getProductById(id: string): Promise<Product> {
  const productQuery = `{
    data: product (id: "${id}")
    {
      ${PRODUCT_QUERY}
    }
  }`;

  const data = await fetchAPI(productQuery);
  return data.data.data;
}
