import Image from 'next/image';
import ContentPage from '../types/content-page-type';
import RichText from './RichText';

type ContentPageContentProps = {
  page: ContentPage;
};

export default function ContentPageContent({ page }: ContentPageContentProps) {
  const image = page.image.results[0];

  return (
    <section className="content-page-content">
      <hr />
      <div className="content-page-content-inner">
        <RichText content={page.content} />
        <div className="content-page-content-image">
          <Image
            src={image.fileUrl}
            alt={image.fileName}
            width={Number(image.fileWidth)}
            height={Number(image.fileHeight)}
          />
        </div>
      </div>
    </section>
  );
}
