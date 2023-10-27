type RepositoryBodyProps = {
  content: string;
};

export default function RepositoryBody({ content }: RepositoryBodyProps) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
