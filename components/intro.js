import {BLOG_NAME } from '../lib/constants'
import Container from '../components/container'

export default function Intro() {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between bg-cover bg-no-repeat bg-center mb-8"
    style={{ backgroundImage: "url('../../assets/blog/shared/demo-blog-hero-banner.jpg')"}}>
      <Container>
        <h1 className="text-3xl md:text-5xl font-bold tracking-tighter leading-tight md:pr-8 mb-16 mt-16 sm:col-16 md:col-1 text-white d-flex align-items-center" >
          {BLOG_NAME}
        </h1>
      </Container>
    </section>
  )
}
