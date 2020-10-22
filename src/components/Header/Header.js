import React from 'react';

import styles from './Header.module.scss';

const Header = () => (
  <div className={styles['header']}>
    blog
    <span className="dark-pink-text">.</span>
    karenying
    <span className="blue-text">.</span>
    com
  </div>
);

export default Header;
