import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'
import { authors } from '../data/authors'

const postsDirectory = join(process.cwd(), '_posts')

function getAuthorById(authorId) {
  const filteredAuthors = authors.filter(author => author.id === authorId)
  if (filteredAuthors.length > 0) {
    return filteredAuthors[0]
  }
  throw(`Error: Author ${authorId} not found. Plase add it to '/data/authors.js'`)
}

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
}

export function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(postsDirectory, `${realSlug}.md`)
  const fileContents = fs.readFileSync(fullPath, 'utf8')
  const { data, content } = matter(fileContents)

  const items = {}

  // Ensure only the minimal needed data is exposed
  fields.forEach((field) => {
    if (field === 'slug') {
      items[field] = realSlug
    }
    if (field === 'content') {
      items[field] = content
    }

    const fieldValue = data[field]
    if (fieldValue) {
      if (field === 'author') {
        items[field] = getAuthorById(fieldValue)
      } else {
        items[field] = fieldValue
      }
    }
  })

  return items
}

export function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}
