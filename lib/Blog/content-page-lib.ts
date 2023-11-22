import { CONTENT_PAGE_QUERY } from '../../graphQl/ContentPage/content-page-query';
import ContentPage from '../../types/content-page-type';
import { fetchAPI } from '../Common/api';

export async function getContentPageById(id: string): Promise<ContentPage> {
  const contentPageQuery = `{
    data: contentPage (id: "${id}")
    {
      ${CONTENT_PAGE_QUERY}
    }
  }`;

  const data = await fetchAPI(contentPageQuery);
  return data.data.data;
}
