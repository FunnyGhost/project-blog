import { getBlogPostList } from './file-helpers';
import RSS from 'rss';

export const generateRssFeed = async () => {
  const posts = await getBlogPostList();
  const feed = new RSS({
    title: 'Catalin Ciubotaru Blog',
    description: 'Some thoughts here',
    feed_url: 'https://catalincodes.com/rss.xml',
    site_url: 'https://catalincodes.com',
    language: 'en',
  });
  posts.forEach((post) =>
    feed.item({
      title: post.title,
      description: post.description,
      url: `https://catalincodes.com/${post.slug}`,
      author: 'Catalin Ciubotaru',
      date: post.publishedOn,
    })
  );

  return feed.xml();
};
