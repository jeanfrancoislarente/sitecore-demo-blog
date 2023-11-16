import Image from 'next/image';
import Blog from '../types/blog-type';
import { ArrowButton } from './Buttons';
import { useMemo, useState } from 'react';
import PostCard from './PostCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export type RelatedEntity = {
  id: string;
  name: string;
  href: string;
  relatedPosts: Blog[];
};

export type PostSuggestionsProps = {
  relatedEntities: RelatedEntity[];
};

export default function PostSuggestions({ relatedEntities }: PostSuggestionsProps) {
  const [currentEntity, setCurrentEntity] = useState(relatedEntities[0]);
  const [optionsVisible, setOptionsVisible] = useState(false);

  const suggestionsContent = useMemo(() => {
    return currentEntity.relatedPosts.length > 0 ? (
      <div className="post-suggestions-content">
        {currentEntity.relatedPosts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    ) : (
      <div className="post-suggestions-content-empty">
        <h4>Oops!</h4>
        <h4>We have not written much about that yet!</h4>
        <Image
          src="/assets/blog/shared/no-related-posts.svg"
          width={1320}
          height={280}
          alt={'No related posts'}
        />
      </div>
    );
  }, [currentEntity.relatedPosts]);

  return (
    <section className="post-suggestions">
      <div className="post-suggestions-title">
        <h3>Dive deeper into</h3>
        <div className={`post-suggestions-select ${optionsVisible ? 'options-visible' : ''}`}>
          <button
            onClick={() => {
              setOptionsVisible(!optionsVisible);
            }}
          >
            {currentEntity.name}
          </button>
          <div
            className="post-suggestions-options-backdrop"
            onClick={() => setOptionsVisible(false)}
          />
          <div className="post-suggestions-options">
            {relatedEntities.map((entity, i) => (
              <button
                key={entity.id}
                onClick={() => {
                  setCurrentEntity(relatedEntities[i]);
                  setOptionsVisible(!optionsVisible);
                }}
                className={currentEntity.id === entity.id ? 'selected' : ''}
              >
                {entity.name}
                <FontAwesomeIcon icon={faCheck} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {suggestionsContent}
      <div className="post-suggestions-link">
        <ArrowButton label="All related articles" href={currentEntity.href} />
      </div>
    </section>
  );
}
