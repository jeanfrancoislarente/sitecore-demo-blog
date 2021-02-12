import Container from './container'
import Link from 'next/link'
import { BLOG_NAME } from '../lib/constants'

export default function Footer() {
  return (
    <footer>
      <div className="flex-col md:flex-row flex items-center md:justify-between site-footer mt-10">
        <Container>
        </Container>
      </div>
    </footer>
  )
}
