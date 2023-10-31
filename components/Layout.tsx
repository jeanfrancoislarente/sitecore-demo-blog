import { PropsWithChildren } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from './Footer';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
