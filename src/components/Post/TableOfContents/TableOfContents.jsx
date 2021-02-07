import React, { useEffect, useState, useRef } from 'react';
const slugs = require(`github-slugger`)();

import styles from './TableOfContents.module.scss';

const toSlug = (value) => {
  return slugs.slug(value, false);
};

const TableOfContents = ({ headings }) => {
  const getUrlPos = () => {
    slugs.reset();
    const headingSlugs = headings.map((h) => toSlug(h.value));

    return headingSlugs.findIndex((h) => window.location.href.includes(h));
  };

  console.log(getUrlPos());

  const [currNode, setCurrNode] = useState(getUrlPos());
  const [isScrollingUp, setScrollDir] = useState(false);
  const [isScrolling, setIsScrolling] = useState(true);
  const headerOffetsRef = useRef();

  useEffect(() => {
    slugs.reset();

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
    setCurrNode(getUrlPos());
  }, [window.location.href]);

  useEffect(() => {
    if (!isScrolling) {
      return;
    }

    const currPos = window.pageYOffset;

    const checkRelativePos = (i) => {
      if (
        currPos > headerOffetsRef.current[i] - 100 &&
        currPos <= headerOffetsRef.current[i]
      ) {
        setCurrNode(i);
      }
    };

    if (isScrollingUp) {
      for (let i = currNode; i >= 0; i--) {
        if (currPos < headerOffetsRef.current[0] - 100) {
          setCurrNode(-1);
          break;
        }

        checkRelativePos(i);
      }
    } else {
      for (let i = currNode; i < headerOffetsRef.current.length; i++) {
        checkRelativePos(i);
      }
    }
  }, [isScrolling, isScrollingUp]);

  const renderHeadings = () => {
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
        >
          {value}
        </a>
      );
    });
  };

  return (
    <div className={styles['toc']}>
      <div className={styles['toc__title']}>Contents</div>
      <div className={styles['toc__content']}>{renderHeadings()}</div>
    </div>
  );
};

export default TableOfContents;
