import React from 'react';
import Helmet from 'react-helmet';
import styles from './Layout.module.scss';
import { useSiteMetadata } from '../../hooks';

const Layout = ({ children, title, description, socialImage }) => {
  const metaImage = socialImage || '/preview.png';
  const { url } = useSiteMetadata();
  const metaImageUrl = url + metaImage;

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang='en' />
        <title>{title}</title>
        <meta name='description' content={description} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={metaImageUrl} />
        <meta property='og:title' content={title} />
        <meta property='og:type' content='website' />
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
