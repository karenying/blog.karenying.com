import React from 'react';
import styles from './TableOfContents.module.scss';

const TITLE_TYPES = new Set(['H2', 'H3', 'H4', 'H5', 'H6']);

function createATag(node) {
  const { id } = node;
  const AStart = `<a href=#${id} >`;
  const AEnd = '</a>';

  node.removeAttribute('id');

  return AStart + node.outerHTML + AEnd;
}

const TableOfContents = ({ html }) => {
  const el = document.createElement('html');
  el.innerHTML = html;
  const body = el.lastChild;
  const children = body.childNodes;

  const titles = Array.prototype.slice
    .call(children)
    .filter((child) => TITLE_TYPES.has(child.nodeName));

  let output = '';
  titles.forEach((title) => {
    title.removeChild(title.firstChild);
    output += createATag(title);
  });

  return (
    <div className={styles['toc']}>
      <h2 className={styles['toc__title']}>table of contents</h2>
      <div
        className={styles['toc__content']}
        dangerouslySetInnerHTML={{ __html: output }}
      ></div>
    </div>
  );
};

export default TableOfContents;
