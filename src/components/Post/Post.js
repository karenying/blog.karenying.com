import React from 'react';
import { Link } from 'gatsby';
import Content from './Content';
import { Tags } from '../Feed/Feed';
import styles from './Post.module.scss';
import { useSiteMetadata } from '../../hooks';
import { withPrefix } from 'gatsby';
import Copyright from '../Sidebar/Copyright'
import Contacts from '../Sidebar/Contacts'

const Post = ({ post }) => {
  const { html } = post;
  const { tagSlugs } = post.fields;
  const { tags, title, date, minutes } = post.frontmatter;
  const { author } = useSiteMetadata();

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
        <Content body={html} title={title} date={date} minutes={minutes}/>
      </div>

      <div className={styles['post__tags']}>
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
      </div>
      
      <div className={styles['post__footer']}>
        <div className={styles['post__footer-right']}>
          <img
            src={withPrefix(author.photo)}
            className={styles['post__footer-right-photo']}
            width="50"
            height="50"
            alt={author.name}
          />

          <div className={styles['post__footer-right-details']}>
            <Link className={styles['post__footer-right-details-home']} to="/">
                blog
                <span className="dark-pink-text">.</span>
                karenying
                <span className="blue-text">.</span>
                com
            </Link>
            <div className={styles['post__footer-right-details-tagline']}>
              i
              {' '}
              <span className="blue-text">beep boop</span>
              {' '}
              <span className="light-pink-text">&amp;&amp;</span>
              {' '}
              share
              {' '}
              <span className="dark-pink-text">opinions</span>
            </div>
          </div>
        </div>
        <div className={styles['post__footer-contacts']}>
          <Contacts />
        </div>
      </div>
      <div className={styles['post__copyright']}>
        <Copyright />
      </div>
    </div>
  );
};

export default Post;
