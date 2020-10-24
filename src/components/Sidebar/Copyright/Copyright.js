import React from 'react';
import styles from './Copyright.module.scss';

const Copyright = ({ copyright }) => (
  <div className={styles['copyright']}>
    <span className='dark-pink-text'>©</span>{' '}
    <span className='light-pink-text'>karen ying</span>{' '}
    <span className='light-gray-text'>•</span>{' '}
    <span className='blue-text'>all rights reserved</span>
  </div>
);

export default Copyright;
