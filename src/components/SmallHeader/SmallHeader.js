import React from 'react';
import styles from './SmallHeader.module.scss';

import { useSiteMetadata } from '../../hooks';
import { withPrefix } from 'gatsby';

const SmallHeader = () => {
  const { author } = useSiteMetadata();

  return (
    <div className={styles['smallheader']}>
      <div className={styles['smallheader__inner']}>
        <div className={styles['smallheader__inner-right']}>
          <img
            src={withPrefix(author.photo)}
            className={styles['author__photo']}
            width="55"
            height="55"
            alt={author.name}
          />

          <div className={styles['smallheader__inner-right-details']}>
            <div className={styles['smallheader__inner-right-details-home']}>
                blog
                <span className="dark-pink-text">.</span>
                karenying
                <span className="blue-text">.</span>
                com
            </div>
            <div className={styles['smallheader__inner-right-details-tagline']}>
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
      </div>
    </div>
  );
};

export default SmallHeader;
