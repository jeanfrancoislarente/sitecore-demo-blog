import { PropsWithChildren, ReactNode } from 'react';

type PageHeaderProps = PropsWithChildren & {
  title: ReactNode;
  subtitle?: string;
  description?: ReactNode;
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
        <div className="page-header-content-body">{description}</div>
      </div>
      <div className="page-header-extra">{children}</div>
    </section>
  );
}
