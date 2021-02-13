import Header from '../components/header'
import Meta from '../components/meta'
import Footer from '../components/footer'

export default function Layout({ preview, children }) {
  return (
    <>
      <Meta />
      <Header />
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
      <Footer />
    </>
  )
}
