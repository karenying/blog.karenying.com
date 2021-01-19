import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout';
import Post from '../components/Post';
import { useSiteMetadata } from '../hooks';

const PostTemplate = ({ data }) => {
  const { title: siteTitle, subtitle: siteSubtitle } = useSiteMetadata();
  const { frontmatter, headings } = data.markdownRemark;

  const {
    title: postTitle,
    description: postDescription,
    socialImage,
  } = frontmatter;
  const metaDescription = postDescription || siteSubtitle;
  const socialImageUrl = socialImage ? socialImage['publicURL'] : undefined;

  return (
    <Layout
      title={`${postTitle} - ${siteTitle}`}
      description={metaDescription}
      socialImage={socialImageUrl}
    >
      <Post post={data.markdownRemark} headings={headings} />
    </Layout>
  );
};

export const query = graphql`
  query PostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      html
      fields {
        slug
        tagSlugs
      }
      frontmatter {
        date
        description
        tags
        title
        minutes
        socialImage {
          publicURL
        }
      }
      headings {
        depth
        value
      }
    }
  }
`;

export default PostTemplate;
