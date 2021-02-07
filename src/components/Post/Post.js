import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';
import Content from './Content';
import { Tags } from '../Feed/Feed';
import styles from './Post.module.scss';
import { useSiteMetadata } from '../../hooks';
import { withPrefix } from 'gatsby';
import Copyright from '../Sidebar/Copyright';
import Contacts from '../Sidebar/Contacts';
import { IoIosArrowUp } from 'react-icons/io';
import SubscribeCard from '../SubscribeCard';
import TableOfContents from './TableOfContents';

export const CopyrightFooter = () => (
  <div className={styles['post__copyright']}>
    <Copyright />
    <div className={styles['post__copyright-contacts']}>
      <Contacts />
    </div>
  </div>
);

const HomeButton = ({ className, opacity }) => (
  <Link className={styles[className]} to='/' style={{ opacity }}>
    <div className={styles['header']}>
      blog
      <span className='dark-pink-text'>.</span>
      karenying
      <span className='blue-text'>.</span>
      com
    </div>
  </Link>
);

const Post = ({ post, headings }) => {
  const { html } = post;
  const { tagSlugs } = post.fields;
  const { tags, title, description, date, minutes } = post.frontmatter;
  const { author } = useSiteMetadata();

  const [opacity, setOpacity] = useState(0);
  const [isScrollingUp, setScrollDir] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const minShowThreshold = 812;
    let lastScrollY = window.pageYOffset;
    let isScrolling = true;
    let requestID;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      setScrollDir(scrollY > minShowThreshold && scrollY < lastScrollY);
      lastScrollY = scrollY;
      isScrolling = true;
    };

    const onScroll = () => {
      if (isScrolling) {
        requestID = window.requestAnimationFrame(updateScrollDir);
        isScrolling = false;
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    setOpacity(isScrollingUp ? 1 : 0);
  }, [isScrollingUp]);

  return (
    <div className={styles['post']}>
      <HomeButton className='post__home-button' opacity={1} />
      <HomeButton className='post__home-button-float' opacity={opacity} />
      <div
        className={styles['post__top']}
        style={{ opacity }}
        onClick={scrollToTop}
      >
        <IoIosArrowUp className={styles['shadow']} />
      </div>
      <TableOfContents headings={headings.filter((h) => h.depth <= 3)} />
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

      <div className={styles['post__subscribe']}>
        <SubscribeCard isPost />
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
      <div className={styles['post__copyright-container']}>
        <CopyrightFooter />
      </div>
    </div>
  );
};

export default Post;
