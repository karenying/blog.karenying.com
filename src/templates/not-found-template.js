// @flow strict
import React from 'react';
import Sidebar from '../components/Sidebar';
import Layout from '../components/Layout';
import Page from '../components/Page';
import SmallHeader from '../components/SmallHeader';
import Header from '../components/Header';
import { useSiteMetadata } from '../hooks';

const NotFoundTemplate = () => {
  const { title, subtitle } = useSiteMetadata();

  return (
    <>
      <Header />
      <Layout title={`Not Found - ${title}`} description={subtitle}>
        <Sidebar />
        <SmallHeader />
        <Page title="NOT FOUND">
          <p className="light-gray-text">
            oops, something went wrong{' '}
            <span role='img' aria-label='confused'>
              😨
            </span>
          </p>
        </Page>
      </Layout>
    </>
  );
};

export default NotFoundTemplate;
