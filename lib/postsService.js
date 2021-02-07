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

function getPostSlugs() {
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

export function getAllNonFeaturedPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // keep only non-featured posts
    .filter(post => !post.featuredOrder)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}

export function getAllFeaturedPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // keep only featured posts
    .filter(post => !!post.featuredOrder)
    // sort posts by featuredOrder in ascending order
    .sort((post1, post2) => (post1.featuredOrder < post2.featuredOrder ? '-1' : '1'))
  return posts
}

export function getPostsByRepository(repo, fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // keep only posts related to the repo
    .filter(post => post.repositories && post.repositories.length > 0 && post.repositories.filter(repository => repository === repo).length > 0)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}

export function getPostsByTeamMember(teamMember, fields = []) {
  console.log('team member: ' + teamMember)
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // keep only posts by the team member
    .filter(post => post.author.id === teamMember)
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}
