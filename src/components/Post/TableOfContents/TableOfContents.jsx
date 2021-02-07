import React, { useEffect, useState, useRef } from 'react';
const slugs = require(`github-slugger`)();

import styles from './TableOfContents.module.scss';

const toSlug = (value) => {
  slugs.reset();
  return slugs.slug(value, false);
};

const TableOfContents = ({ headings }) => {
  const [currNode, setCurrNode] = useState(-1);
  const [isScrollingUp, setScrollDir] = useState(false);
  const [isScrolling, setIsScrolling] = useState(true);
  const headerOffetsRef = useRef();

  useEffect(() => {
    headerOffetsRef.current = headings.map(({ value }) => {
      const element = document.getElementById(toSlug(value));
      return (element && element.offsetTop) || 0;
    });

    // Scroll direction logic
    let lastScrollY = window.pageYOffset;
    let requestID;

    const updateScrollDir = () => {
      const scrollY = window.pageYOffset;

      setScrollDir(scrollY < lastScrollY);
      lastScrollY = scrollY;
      setIsScrolling(true);
    };

    const onScroll = () => {
      if (isScrolling) {
        requestID = window.requestAnimationFrame(updateScrollDir);
        setIsScrolling(false);
      }
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      cancelAnimationFrame(requestID);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isScrolling) {
      return;
    }

    const curr = window.pageYOffset;
    let prev = currNode;

    console.log(headerOffetsRef.current);
    console.log(curr);

    if (isScrollingUp) {
      for (let i = currNode; i >= 0; i--) {
        if (
          curr > headerOffetsRef.current[i] &&
          curr <= headerOffetsRef.current[prev]
        ) {
          setCurrNode(prev);
          break;
        }
        prev = i;
      }
    } else {
      for (let i = currNode; i < headerOffetsRef.current.length; i++) {
        if (
          curr <= headerOffetsRef.current[i] &&
          curr > headerOffetsRef.current[prev]
        ) {
          setCurrNode(i);
          break;
        }

        prev = i;
      }
    }
  }, [isScrolling, isScrollingUp]);

  const activeStyle = { borderLeft: '2px solid #ffb6b9' };

  const renderHeadings = () =>
    headings.map((heading, i) => {
      const { depth, value } = heading;
      const slug = toSlug(value);
      const active = i === currNode ? styles['toc__content-active'] : '';

      if (depth === 2 || depth === 3) {
        return (
          <a
            className={`${styles[`toc__content-h${depth}`]} ${active}`}
            href={`#${slug}`}
            key={slug}
          >
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
