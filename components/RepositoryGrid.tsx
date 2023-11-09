import Repository from '../types/repository-type';
import RepositoryPreview from './RepositoryPreview';

export default function RepositoryGrid({ repositories }: { repositories: Repository[] }) {
  return (
    <section className="listing-grid">
      <hr />
      <div className="listing-grid-inner">
        {repositories.map((repository) => (
          <RepositoryPreview
            key={repository.id}
            title={repository.name}
            slug={repository.id}
            excerpt={repository.summary}
            url={repository.url}
          />
        ))}
      </div>
    </section>
  );
}
