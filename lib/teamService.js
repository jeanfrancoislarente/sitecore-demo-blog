import fs from 'fs'
import { join } from 'path'
import matter from 'gray-matter'

const teamMembersDirectory = join(process.cwd(), '_team')

function getTeamMembersSlugs() {
  return fs.readdirSync(teamMembersDirectory)
}

export function getTeamMemberBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = join(teamMembersDirectory, `${realSlug}.md`)
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

export function getAllTeamMembers(fields = []) {
  const slugs = getTeamMembersSlugs()
  const teamMembers = slugs
    .map((slug) => getTeamMemberBySlug(slug, fields))
    // sort team members by order in ascending order
    .sort((teamMember1, teamMember2) => (teamMember1.order < teamMember2.order ? '-1' : '1'))
  return teamMembers
}
