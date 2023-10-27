import { PropsWithChildren } from 'react';

export default function PageTitle({ children }: PropsWithChildren) {
  return <h1>{children}</h1>;
}
