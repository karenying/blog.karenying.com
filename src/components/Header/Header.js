import React from 'react';
import { Link } from 'gatsby';

import styles from './Header.module.scss';

const Header = ( { isIndex } ) => (
  <div className={styles['header']}>
    {
      isIndex ?     
        <div className={styles['header__no-link']}>
          blog
          <span className="dark-pink-text">.</span>
          karenying
          <span className="blue-text">.</span>
          com
        </div> 
      :
        <Link className={styles['header__link']} to="/">
          blog
          <span className="dark-pink-text">.</span>
          karenying
          <span className="blue-text">.</span>
          com
        </Link>
    }
  </div>
);

export default Header;
