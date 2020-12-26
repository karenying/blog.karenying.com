import React from 'react';
import styles from './Copyright.module.scss';

const Copyright = () => (
  <div className={styles['copyright']}>
    © karen ying <span className={styles['copyright__dot']}>•</span> all rights
    reserved
  </div>
);

export default Copyright;
