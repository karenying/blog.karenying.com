import React from 'react';
import { Link } from 'gatsby';
import styles from './Feed.module.scss';
import moment from 'moment';

const Feed = ({ edges }) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <h2 className={styles['feed__item-title']}>
          <Link className={styles['feed__item-title-link']} to={edge.node.fields.slug}>{edge.node.frontmatter.title}</Link>
        </h2>

        <p className={styles['feed__item-description']}>{edge.node.frontmatter.description}</p>

        <div className={styles['feed__item-details']}>
          <p>
            <span className="dark-pink-text">
              { moment(new Date(edge.node.frontmatter.date)).format('MMM D') }
            </span>
            <span className={`${styles['feed__item-details-dot']} light-gray-text`}>•</span>
            <span className="blue-text">x min read</span>
          </p>
        </div>

        <div className={styles['feed__item-meta']}>
          <span className={styles['feed__item-meta-category']}>
            <Link to={edge.node.fields.categorySlug} className={styles['feed__item-meta-category-link']}>{edge.node.frontmatter.category}</Link>
          </span>
        </div>
      </div>
    ))}
  </div>
);

export default Feed;
