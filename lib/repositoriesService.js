import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const repositoriesDirectory = join(process.cwd(), '_repositories')

function getRepositorySlugs() {
  return fs.readdirSync(repositoriesDirectory)
}

export function getRepositoryBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(repositoriesDirectory, `${realSlug}.md`)
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
      items[field] = fieldValue
    }
  })

  return items
}

export function getAllRepositories(fields = []) {
  const slugs = getRepositorySlugs()
  const repos = slugs
    .map((slug) => getRepositoryBySlug(slug, fields))
    // sort repos by order in ascending order
    .sort((repo1, repo2) => (repo1.order < repo2.order ? '-1' : '1'))
  return repos
}
