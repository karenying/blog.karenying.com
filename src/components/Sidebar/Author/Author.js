import React from 'react';
import { withPrefix, Link } from 'gatsby';
import styles from './Author.module.scss';

const Author = ({ author }) => (
  <div className={styles['author']}>
    <Link to='/'>
      <img
        src={withPrefix(author.photo)}
        className={styles['author__photo']}
        width='150'
        height='150'
        alt={author.name}
      />
    </Link>
    <div className={styles['author__tagline']}>
      i <span className='blue-text'>beep boop</span>{' '}
      <span className='light-pink-text'>&amp;&amp;</span>
      <br />
      <span className='dark-pink-text'>write</span> about it
    </div>

    <div className={styles['author__creds']}>
      cs '21 <span className='yellow-text'>@</span> princeton
      <br />
      swe <span className='yellow-text'>@</span>{' '}
      <a
        href='https://www.wellsheet.com/'
        target='_blank'
        rel='noopener noreferrer'
      >
        wellsheet
      </a>
    </div>
  </div>
);

export default Author;
