import React from 'react';

import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';

import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { BLOG_TITLE } from '@/constants';
import COMPONENT_MAP from '@/helpers/mdx-components';
import { notFound } from 'next/navigation';

const getBlogPost = React.cache((postSlug) => loadBlogPost(postSlug));

export async function generateMetadata({ params }) {
  const blogPost = await getBlogPost(params.postSlug);
  if (!blogPost) return notFound();
  return {
    title: `${blogPost.frontmatter.title} • ${BLOG_TITLE}`,
    description: `${blogPost.frontmatter.abstract}`,
  };
}

async function BlogPost({ params }) {
  const blogPost = await getBlogPost(params.postSlug);
  if (!blogPost) return;

  return (
    <article className={styles.wrapper}>
      <BlogHero title={blogPost.frontmatter.title} publishedOn={blogPost.frontmatter.publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={blogPost.content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
