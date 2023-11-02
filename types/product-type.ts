import { MediaResults } from './Common/media-type';

type Product = {
  id: string;
  name: string;
  logo: MediaResults;
  description: string;
  getDemoLink: string;
  exploreProductLink: string;
};

export default Product;

export type ProductResults = {
  results: Product[];
};
