import markdownStyles from './markdown-styles.module.css';

type RepositoryBodyProps = {
  content: string;
};

export default function RepositoryBody({ content }: RepositoryBodyProps) {
  return (
    <div className={markdownStyles['markdown']} dangerouslySetInnerHTML={{ __html: content }} />
  );
}
