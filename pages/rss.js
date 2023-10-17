import { getAllPosts } from '../lib/api'
import markdownToHtml from '../lib/markdownToHtml'

async function getBlogPostsRssXml(blogPosts) {
  let latestPostDate = ''
  let rssItemsXml = ''

  for (let i = 0; i < blogPosts.length; i++) {
    const post = blogPosts[i];
    const postDate = Date.parse(post.date)
    const postHref = `https://blog.sitecoredemo.com/posts/${post.slug}`
    const postContent = await markdownToHtml(post.content || '')

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date
    }

    rssItemsXml += `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${postHref}</link>
        <pubDate>${post.date}</pubDate>
        <guid isPermaLink="false">${postHref}</guid>
        <description>
          <![CDATA[${post.excerpt}]]>
        </description>
        <content:encoded>
          <![CDATA[${postContent}]]>
        </content:encoded>
    </item>`
  }

  return {
    rssItemsXml,
    latestPostDate
  }
}

async function getRssXml(blogPosts) {
  const { rssItemsXml, latestPostDate } = await getBlogPostsRssXml(blogPosts)

  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
      <title>
        <![CDATA[Sitecore Demo Team Blog Feed]]>
      </title>
      <link>https://blog.sitecoredemo.com</link>
      <description>
        <![CDATA[A collection of amazing and (hopefully) helpful posts centered around the Sitecore Demo Team's work and experiences.]]>
      </description>
      <language>en</language>
      <lastBuildDate>${latestPostDate}</lastBuildDate>
      ${rssItemsXml}
    </channel>
  </rss>`
}

export default function Rss() {
  // Do nothing
}

export async function getServerSideProps(context) {
  const res = context.res
  if (!res) {
    return
  }

  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'excerpt',
    'content',
  ])
  const rssFeedContent = await getRssXml(allPosts)

  res.setHeader("Content-Type", "text/xml")
  res.write(rssFeedContent)
  res.end()

  return {
    props: {}
  }
}
