import React from 'react';
import { Link } from 'gatsby';
import styles from './Feed.module.scss';
import { DateTime } from 'luxon';

export const Tags = ({ tags, tagSlugs }) => (
  <div className={styles['feed__item-tags-container']}>
    {tagSlugs &&
      tagSlugs.map((slug, i) => (
        <Link
          to={slug}
          className={styles['feed__item-tags-link']}
          key={tags[i]}
        >
          {tags[i]}{' '}
        </Link>
      ))}
  </div>
);

const Feed = ({ edges }) => (
  <div className={styles['feed']}>
    {edges.map((edge) => (
      <div className={styles['feed__item']} key={edge.node.fields.slug}>
        <h2 className={styles['feed__item-title']}>
          <Link
            className={styles['feed__item-title-link']}
            to={edge.node.fields.slug}
          >
            {edge.node.frontmatter.title}
          </Link>
        </h2>

        <p className={styles['feed__item-description']}>
          {edge.node.frontmatter.description}
        </p>

        <div className={styles['feed__item-details']}>
          <p>
            <span className='dark-pink-text'>
              {DateTime.fromISO(edge.node.frontmatter.date).toFormat('MMM d')}
            </span>
            <span className={`${styles['feed__item-details-dot']} yellow-text`}>
              •
            </span>
            <span className='blue-text'>
              {Math.round(edge.node.fields.readingTime.minutes)} min read
            </span>
          </p>
        </div>
        {edge.node.frontmatter.tags && edge.node.fields.tagSlugs && (
          <Tags
            tags={edge.node.frontmatter.tags}
            tagSlugs={edge.node.fields.tagSlugs}
          />
        )}
      </div>
    ))}
  </div>
);

export default Feed;
