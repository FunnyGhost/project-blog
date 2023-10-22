import React from 'react';

import BlogSummaryCard from '@/components/BlogSummaryCard';

import styles from './homepage.module.css';
import { getBlogPostList } from '@/helpers/file-helpers';

async function Home() {
  const posts = await getBlogPostList();

  const postElements = posts.map((post) => (
    <BlogSummaryCard
      key={post.slug}
      slug={post.slug}
      title={post.title}
      abstract={post.abstract}
      publishedOn={post.publishedOn}
    />
  ));
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.mainHeading}>Latest Content:</h1>
      {postElements}
    </div>
  );
}

export default Home;
