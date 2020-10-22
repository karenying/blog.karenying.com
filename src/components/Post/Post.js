import React from 'react';
import { Link } from 'gatsby';
import Content from './Content';
import { Tags } from '../Feed/Feed';
import styles from './Post.module.scss';

const Post = ({ post }) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to="/">
        <div className={styles['header']}>
          blog
          <span className="dark-pink-text">.</span>
          karenying
          <span className="blue-text">.</span>
          com
        </div>
      </Link>
      <div className={styles['post__content']}>
        <Content body={html} title={title} />
      </div>

      <div className={styles['post__footer']}>
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
      </div>
    </div>
  );
};

export default Post;
