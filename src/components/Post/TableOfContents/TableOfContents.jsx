import React, { useEffect, useState, useRef, useCallback } from 'react';
const slugs = require(`github-slugger`)();

import styles from './TableOfContents.module.scss';

const TOP_BUFFER = 50;
const MIN_SCREEN_SIZE = 1100;

const toSlug = (value) => {
  return slugs.slug(value, false);
};

const TableOfContents = ({ headings }) => {
  // returns the node index based on window.location.href
  const getUrlPos = () => {
    slugs.reset();
    const headingSlugs = headings.map((h) => toSlug(h.value));

    return headingSlugs.findIndex((h) => window.location.href.includes(h));
  };

  const [currNode, setCurrNode] = useState(
    typeof window !== 'undefined' ? getUrlPos() : -1
  );
  const headerOffetsRef = useRef(); // array of offsets of the header

  useEffect(() => {
    if (window.screen.width < MIN_SCREEN_SIZE) {
      return;
    }

    slugs.reset();

    headerOffetsRef.current = headings.map(({ value }) => {
      const element = document.getElementById(toSlug(value));
      return (element && element.offsetTop) || 0;
    });

    const onScroll = () => {
      const currPos = window.pageYOffset;

      const checkRelativePos = (i) => {
        if (
          currPos > headerOffetsRef.current[i] - TOP_BUFFER &&
          currPos <= headerOffetsRef.current[i]
        ) {
          setCurrNode(i);
          return true;
        }

        return false;
      };

      for (let i = 0; i < headerOffetsRef.current.length; i++) {
        if (currPos < headerOffetsRef.current[0] - TOP_BUFFER) {
          setCurrNode(-1);
          break;
        }

        if (checkRelativePos(i)) {
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const renderHeadings = useCallback(() => {
    slugs.reset();

    return headings.map((heading, i) => {
      const { depth, value } = heading;
      const slug = toSlug(value);
      const active = i === currNode ? styles['toc__content-active'] : '';

      return (
        <a
          className={`${styles[`toc__content-h${depth}`]} ${active}`}
          href={`#${slug}`}
          key={slug}
          onClick={() => setCurrNode(i)}
        >
          {value}
        </a>
      );
    });
  }, [currNode]);

  return (
    <div className={styles['toc']}>
      <div className={styles['toc__title']}>Contents</div>
      <div className={styles['toc__content']}>
        <div className={styles['toc__content-overlay-top']} />
        {renderHeadings()}
        <div className={styles['toc__content-overlay-bottom']} />
      </div>
    </div>
  );
};

export default TableOfContents;
