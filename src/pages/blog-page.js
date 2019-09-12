import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import PostsList from '../components/Post/PostList';
// import TinyLetterSignup from '../../components/TinyLetterSignUp';

const PostsPage = ({ data }) => {
  // console.log(data.posts);
  const blogParallax =
    data.blogParallaxImg.edges[0].node.featured_media.localFile.childImageSharp
      .fluid;
  const fallBackParallax = data.fallBackParallaxImg.fluid;
  const fluid = blogParallax || fallBackParallax;

  return (
    <Layout>
      <PostsList
        showArrow
        showImage
        showCategories
        showSearch
        showTags
        filterCategoriesAndTagsFromURLParams
        fallBackParallax={fallBackParallax}
        fluid={fluid}
        categories={data.categories.edges}
        tags={data.tags.edges}
        posts={data.posts.edges}
      />
      {/* <TinyLetterSignup /> */}
      {/* <div>
      <h1>Test</h1>
    </div> */}
    </Layout>
  );
};

export default PostsPage;

export const PostsPageQuery = graphql`
  query allBlogQuery {
    categories: allWordpressCategory {
      edges {
        node {
          id
          name
          description
          count
        }
      }
    }
    tags: allWordpressTag(sort: { fields: count, order: DESC }) {
      edges {
        node {
          id
          name
          description
          count
        }
      }
    }
    posts: allWordpressPost(sort: { fields: [date], order: DESC }) {
      edges {
        node {
          acf {
            all_title
            all_description
            blog_title
            blog_description
            events_title
            events_description
            sermons_title
            sermons_description
            blog_page_title
            blog_page_subtitle
          }
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
