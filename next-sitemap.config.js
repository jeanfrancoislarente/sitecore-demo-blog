module.exports = {
  siteUrl: 'https://blog.sitecoredemo.com',
  changefreq: 'monthly',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: [
    '/sitemap.xml',
    '/server-sitemap.xml',
    '/posts/*', // Exclude dynamic posts URLs from the main static sitemap as new pages will become available after the static genration of the sitemap at build time.
    '/repositories/*', // Exclude dynamic repositories URLs from the main static sitemap as new pages will become available after the static genration of the sitemap at build time.
  ],
  robotsTxtOptions: {
    additionalSitemaps: ['https://blog.sitecoredemo.com/server-sitemap.xml'],
  },
};
