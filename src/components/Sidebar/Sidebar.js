import React from 'react';
import Author from './Author';
import Contacts from './Contacts';
import Copyright from './Copyright';
import styles from './Sidebar.module.scss';
import { useSiteMetadata } from '../../hooks';

const Sidebar = () => {
  const { author, copyright } = useSiteMetadata();

  return (
    <div className={styles['sidebar']}>
      <div className={styles['sidebar__inner']}>
        <Author author={author} />
        <Contacts contacts={author.contacts} />
        <Copyright copyright={copyright} />
      </div>
    </div>
  );
};

export default Sidebar;
