import React, { useEffect, useState } from 'react';
const slugs = require(`github-slugger`)();

import styles from './TableOfContents.module.scss';

const toSlug = (value) => slugs.slug(value, false);

const TableOfContents = ({ headings }) => {
  const renderHeadings = () =>
    headings.map((heading) => {
      const { depth, value } = heading;
      const slug = toSlug(value);

      if (depth === 2) {
        return (
          <a style={{ paddingLeft: 5 }} href={`#${slug}`}>
            {value}
          </a>
        );
      } else if (depth === 3) {
        return (
          <a style={{ paddingLeft: 20 }} href={`#${slug}`}>
            {value}
          </a>
        );
      }
    });

  return (
    <div className={styles['toc']}>
      <div className={styles['toc__title']}>Contents</div>
      <div className={styles['toc__content']}>{renderHeadings()}</div>
    </div>
  );
};

export default TableOfContents;
