import React from 'react';
import styles from './Content.module.scss';
import feedStyles from '../../Feed/Feed.module.scss';
import moment from 'moment';

const Content = ({ body, title, date}) => (
  <div className={styles['content']}>
    <h1 className={styles['content__title']}>{title}</h1>

    <div className={`${feedStyles['feed__item-details']} ${styles['content__details']}`}>
      <p>
        <span className="dark-pink-text">
          { moment(new Date(date)).format('MMM D, YYYY') }
        </span>
        <span className={`${feedStyles['feed__item-details-dot']} light-gray-text`}>•</span>
        <span className="blue-text">x min read</span>
      </p>
    </div>

    <div className={styles['content__body']} dangerouslySetInnerHTML={{ __html: body }} />

  </div>
);

export default Content;
