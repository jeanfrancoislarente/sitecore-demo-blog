import { MediaResults } from './Common/media-type';
import { TaxonomyResults } from './Common/taxonomy-type';

type Product = {
  id: string;
  name: string;
  logo: MediaResults;
  description: string;
  getDemoLink: string;
  exploreProductLink: string;
  productGroup: TaxonomyResults;
};

export default Product;

export type ProductResults = {
  results: Product[];
};

export type Products = {
  name: string;
  description: string;
  products: Product[];
};
