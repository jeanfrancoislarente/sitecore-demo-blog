import Repository from '../types/repository-type';
import RepositoryPreview from './RepositoryPreview';

export default function RepositoryGrid({ repositories }: { repositories: Repository[] }) {
  console.log(repositories);
  return (
    <section className="repository-grid">
      <hr />
      <div className="repository-grid-inner">
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
