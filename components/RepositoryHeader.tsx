import Link from "next/link";
import PageTitle from "../components/PageTitle";

type RepositoryHeaderProps = {
  title: string;
  url: string;
};

export default function RepositoryHeader({ title, url }: RepositoryHeaderProps) {
  return (
    <>
      <PageTitle>{title}</PageTitle>
      <Link className="text-2xl md:text-3xl lg:text-4xl font-bold" href={url}>
        View on GitHub
      </Link>
    </>
  );
}
