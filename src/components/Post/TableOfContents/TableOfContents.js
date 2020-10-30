import React, { useRef, useEffect } from 'react';
import styles from './TableOfContents.module.scss';

const TITLE_TYPES = new Set(['H2', 'H3', 'H4', 'H5', 'H6']);

const TableOfContents = ({ html }) => {
  const ref = useRef();

  useEffect(() => {
    const el = document.createElement('html');
    el.innerHTML = html;
    const body = el.lastChild;
    const children = body.childNodes;

    const titles = Array.prototype.slice
      .call(children)
      .filter((child) => TITLE_TYPES.has(child.nodeName));

    titles.forEach((title) => {
      ref.current.appendChild(title);
    });
  }, []);

  return (
    <div className={styles['toc']}>
      <h2>Table of Contents</h2>
      <div className={styles['toc__content']} ref={ref}></div>
    </div>
  );
};

export default TableOfContents;
