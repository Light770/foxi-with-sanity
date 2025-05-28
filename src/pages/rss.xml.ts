import rss from '@astrojs/rss';
import { getAllBlogPosts } from '../lib/sanity';
import { configData } from '../config/config';

export async function GET(context: any) {
  const posts = await getAllBlogPosts();

  return rss({
    title: configData.siteTitle,
    description: configData.siteDescription,
    site: context.site,
    items: posts.map((post: any) => ({
      title: post.title,
      pubDate: post.pubDate,
      description: post.description,
      link: `/blog/${post.slug.current}/`,
    })),
  });
}