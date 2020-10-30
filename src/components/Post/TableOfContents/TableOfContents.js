import React, { useEffect, useState } from 'react';
import styles from './TableOfContents.module.scss';

const TITLE_TYPES = new Set(['H2', 'H3', 'H4', 'H5', 'H6']);

function createATag(node) {
  const { id } = node;

  node.removeAttribute('id');

  return `<a href=#${id}>${node.outerHTML}</a>`;
}

const TableOfContents = ({ html }) => {
  const [htmlString, setHtmlString] = useState('');

  useEffect(() => {
    const el = document.createElement('html');
    el.innerHTML = html;
    const body = el.lastChild;
    const children = body.childNodes;

    const titles = Array.prototype.slice
      .call(children)
      .filter((child) => TITLE_TYPES.has(child.nodeName));

    let s = '';
    titles.forEach((title) => {
      title.removeChild(title.firstChild);
      s += createATag(title);
    });

    setHtmlString(s);
  }, []);

  return (
    <div className={styles['toc']}>
      <h2 className={styles['toc__title']}>table of contents</h2>
      <div
        className={styles['toc__content']}
        dangerouslySetInnerHTML={{ __html: htmlString }}
      ></div>
    </div>
  );
};

export default TableOfContents;
