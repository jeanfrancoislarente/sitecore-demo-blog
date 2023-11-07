import { PropsWithChildren, ReactNode } from 'react';

type PageHeaderProps = PropsWithChildren & {
  title: string;
  subtitle?: string;
  description?: string | ReactNode;
  className?: string;
};

export default function PageHeader({
  title,
  subtitle,
  description,
  children,
  className,
}: PageHeaderProps) {
  return (
    <section className={`page-header ${className}`}>
      <div className="page-header-content">
        <h1>{title}</h1>
        <h5>{subtitle}</h5>
        <p>{description}</p>
      </div>
      <div className="page-header-extra">{children}</div>
    </section>
  );
}
