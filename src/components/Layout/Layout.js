import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';

const Layout = ({ children, title, description, socialImage }) => {
  const metaImage = socialImage || '/preview.png';
  const metaImageUrl = 'https://www.blog.karenying.com' + metaImage;

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:site_name' content={title} />
        <meta property='og:title' content='blog.karenying.com' />
        <meta property='og:image' content={metaImageUrl} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:title' content={title} />
        <meta name='twitter:description' content={description} />
        <meta name='twitter:image' content={metaImageUrl} />
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
