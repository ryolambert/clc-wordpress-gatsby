import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
// import PostsList from '../../components/PostsList';
// import TinyLetterSignup from '../../components/TinyLetterSignUp';

const PostsPage = ({ data }) => (
  <Layout>
    {/* <PostsList
      showChevron="yes"
      showImage="yes"
      showCategories="yes"
      showTags="yes"
      showSearch="yes"
      filterCategoriesAndTagsFromURLParams="yes"
      posts={data.allMarkdownRemark.edges}
    />
    <TinyLetterSignup /> */}
    <div>
      <h1>Test</h1>
    </div>
  </Layout>
);

export default PostsPage;

export const PostsPageQuery = graphql`
  query allBlogQuery {
    allWordpressPost {
      edges {
        node {
          id
          slug
          status
          excerpt
          template
          format
          title
          categories {
            name
          }
          tags {
            name
          }
          date(formatString: "MMMM DD, YYYY")
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 640) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    blogParallaxImg: allWordpressPost(
      sort: { order: DESC, fields: date }
      filter: {
        featured_media: { id: { regex: "/./" } }
        categories: { elemMatch: { name: { eq: "Blog" } } }
      }
      limit: 1
    ) {
      edges {
        node {
          featured_media {
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    fallBackParallaxImg: imageSharp(original: { src: { regex: "/skyline/" } }) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
  }
`;
