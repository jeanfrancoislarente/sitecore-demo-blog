const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const postsDirectory = path.join(process.cwd(), '_posts')

const getPostSlugs = getPostSlugs => {
  return fs.readdirSync(postsDirectory)
}
function getPostBySlug(slug, fields = []) {
  const realSlug = slug.replace(/\.md$/, '')
  const fullPath = path.join(postsDirectory, `${realSlug}.md`)
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
      // if (field === 'author') {
      //   items[field] = getAuthorById(fieldValue)
      // } else {
      items[field] = fieldValue
      // }
    }
  })

  return items
}

function getAllPosts(fields = []) {
  const slugs = getPostSlugs()
  const posts = slugs
    .map((slug) => getPostBySlug(slug, fields))
    // sort posts by date in descending order
    .sort((post1, post2) => (post1.date > post2.date ? '-1' : '1'))
  return posts
}

const test = getAllPosts([
  'title',
  'date',
  'slug',
  'author',
  'excerpt',
  'featuredOrder',
  'primaryTopic',
]);

const blogPostsRssXml = blogPosts => {
  let latestPostDate = '';
  let rssItemsXml = '';
  blogPosts.map(function (item) {
    const post = item;
    const postDate = Date.parse(post.date);

    // Remember to change this URL to your own!
    const postHref = `https://blog.sitecoredemo.com/posts/${post.slug}`;

    if (!latestPostDate || postDate > Date.parse(latestPostDate)) {
      latestPostDate = post.date;
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
          <![CDATA[${post.content}]]>
        </content:encoded>
    </item>`;
  });
  return {
    rssItemsXml,
    latestPostDate
  };
};

const getRssXml = blogPosts => {
  const { rssItemsXml, latestPostDate } = blogPostsRssXml(blogPosts);

  // Edit the '<link>' and '<description>' data here to reflect your own website details!
  return `<?xml version="1.0" ?>
  <rss
    xmlns:dc="http://purl.org/dc/elements/1.1/"
    xmlns:content="http://purl.org/rss/1.0/modules/content/"
    xmlns:atom="http://www.w3.org/2005/Atom"
    version="2.0"
  >
    <channel>
        <title><![CDATA[Sitecore Demo Team Blog Feed]]></title>
        <link>https://blog.sitecoredemo.com</link>
        <description>
          <![CDATA[A collection of amazing and (hopefully) helpful posts centered around the Sitecore Demo Team's work and experiences.]]>
        </description>
        <language>en</language>
        <lastBuildDate>${latestPostDate}</lastBuildDate>
        ${rssItemsXml}
    </channel>
  </rss>`;
};

async function generateRSS() {
  const allBlogPostData = await getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'excerpt',
    'featuredOrder',
    'primaryTopic',
  ]);
  const processedXml = getRssXml(allBlogPostData);

  const staticOutputPath = path.join(process.cwd(), 'out');

  fs.writeFile(`${staticOutputPath}/rss.xml`, processedXml, err => {
    if (err) {
      console.log(err);
    } else {
      console.log('File written successfully');
    }
  });
}

// kick it all off
generateRSS();