import Author from '../types/author-type';
import AuthorPreview from './AuthorPreview';

export default function AuthorGrid({ authors }: { authors: Author[] }) {
  return (
    <section className="listing-grid">
      <div className="listing-grid-inner">
        {authors.map((author) => (
          <AuthorPreview
            key={author.id}
            name={author.authorName}
            photo={author.profilePhoto.results[0]}
            background={author.profileBackground.results[0]}
            jobTitle={author.jobTitle}
            slug={author.id}
          />
        ))}
      </div>
    </section>
  );
}
