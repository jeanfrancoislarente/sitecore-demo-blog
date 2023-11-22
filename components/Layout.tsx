import { PropsWithChildren } from 'react';
import Header from '../components/Header';
import Meta from '../components/Meta';
import Footer from './Footer';
import 'swiper/css/bundle';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Meta />
      <Header />
      <main>{children}</main>
      <Footer />
    </>
  );
}
