import React from 'react';
import styles from './Content.module.scss';
import feedStyles from '../../Feed/Feed.module.scss';
import { DateTime } from 'luxon';

const Content = ({ body, title, description, date, minutes }) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>
    <p className={styles['content__description']}>{description}</p>
    <div
      className={`${feedStyles['feed__item-details']} ${styles['content__details']}`}
    >
      <p>
        <span className='dark-pink-text'>
          {DateTime.fromISO(date).toFormat('MMM d, yyyy')}
        </span>
        <span className={`${feedStyles['feed__item-details-dot']} yellow-text`}>
          •
        </span>
        <span className='blue-text'>{minutes} min read</span>
      </p>
    </div>

    <div
      className={styles['content__body']}
      dangerouslySetInnerHTML={{ __html: body }}
    />
  </div>
);

export default Content;
