import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Sidebar from '../components/Sidebar';
import SmallHeader from '../components/SmallHeader';
import Feed from '../components/Feed';
import Page from '../components/Page';
import { CopyrightFooter } from '../components/Post/Post';
import Pagination from '../components/Pagination';
import Header from '../components/Header';
import { useSiteMetadata } from '../hooks';

const IndexTemplate = ({ data, pageContext }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();

  const {
    currentPage,
    hasNextPage,
    hasPrevPage,
    prevPagePath,
    nextPagePath,
  } = pageContext;

  const { edges } = data.allMarkdownRemark;
  const pageTitle =
    currentPage > 0 ? `Posts - Page ${currentPage} - ${siteTitle}` : siteTitle;

  return (
    <>
      <Header isIndex />
      <Layout title={pageTitle} description={siteSubtitle}>
        <Sidebar isIndex />
        <SmallHeader />
        <Page>
          <Feed edges={edges} />
          <Pagination
            prevPagePath={prevPagePath}
            nextPagePath={nextPagePath}
            hasPrevPage={hasPrevPage}
            hasNextPage={hasNextPage}
          />
          <div className='copyright-footer-wrapper'>
            <CopyrightFooter />
          </div>
        </Page>
      </Layout>
    </>
  );
};

export const query = graphql`
  query IndexTemplate($postsLimit: Int!, $postsOffset: Int!) {
    allMarkdownRemark(
      limit: $postsLimit
      skip: $postsOffset
      filter: { frontmatter: { template: { eq: "post" }, draft: { ne: true } } }
      sort: { order: DESC, fields: [frontmatter___date] }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
            tagSlugs
            readingTime {
              minutes
            }
          }
          frontmatter {
            title
            date
            category
            description
            tags
          }
        }
      }
    }
  }
`;

export default IndexTemplate;
