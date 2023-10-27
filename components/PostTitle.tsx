import { PropsWithChildren } from 'react';

export default function PostTitle({ children }: PropsWithChildren) {
  return <h1>{children}</h1>;
}
