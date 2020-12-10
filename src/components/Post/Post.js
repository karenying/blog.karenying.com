import React, { useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import Content from './Content';
import { Tags } from '../Feed/Feed';
import styles from './Post.module.scss';
import { useSiteMetadata } from '../../hooks';
import { withPrefix } from 'gatsby';
import Copyright from '../Sidebar/Copyright';
import Contacts from '../Sidebar/Contacts';
import { IoIosArrowUp } from 'react-icons/io';

export const CopyrightFooter = () => (
  <div className={styles['post__copyright']}>
    <Copyright />
    <div className={styles['post__copyright-contacts']}>
      <Contacts />
    </div>
  </div>
);

const Post = ({ post }) => {
  const { html } = post;
  const { tagSlugs } = post.fields;
  const { tags, title, description, date, minutes } = post.frontmatter;
  const { author } = useSiteMetadata();

  const scrollRef = useRef();
  let timeoutID;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onScroll = () => {
      scrollRef.current.style.opacity = 0;
      clearTimeout(timeoutID);

      timeoutID = setTimeout(() => {
        scrollRef.current.style.opacity = 1;
      }, 100);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(timeoutID);
    };
  }, []);

  return (
    <div className={styles['post']}>
      <Link className={styles['post__home-button']} to='/'>
        <div className={styles['header']}>
          blog
          <span className='dark-pink-text'>.</span>
          karenying
          <span className='blue-text'>.</span>
          com
        </div>
      </Link>
      <div
        className={styles['post__top']}
        onClick={scrollToTop}
        ref={scrollRef}
      >
        <IoIosArrowUp className={styles['shadow']} />
      </div>
      <div className={styles['post__content']}>
        <Content
          body={html}
          title={title}
          description={description}
          date={date}
          minutes={minutes}
        />
      </div>

      <div className={styles['post__tags']}>
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
      </div>

      <div className={styles['post__footer']}>
        <div className={styles['post__footer-right']}>
          <img
            src={withPrefix(author.photo)}
            className={styles['post__footer-right-photo']}
            width='65'
            height='65'
            alt={author.name}
          />

          <div className={styles['post__footer-right-details']}>
            <Link className={styles['post__footer-right-details-home']} to='/'>
              blog
              <span className='dark-pink-text'>.</span>
              karenying
              <span className='blue-text'>.</span>
              com
            </Link>
            <div className={styles['post__footer-right-details-tagline']}>
              i <span className='blue-text'>beep boop</span>{' '}
              <span className='light-pink-text'>&amp;&amp;</span>{' '}
              <span className='dark-pink-text'>write</span> about it
            </div>
          </div>
        </div>
        <div className={styles['post__footer-contacts']}>
          <Contacts />
        </div>
      </div>
      <CopyrightFooter />
    </div>
  );
};

export default Post;
