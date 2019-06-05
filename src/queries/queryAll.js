'use strict';

module.exports = `
    {
        allWordpressPage {
            edges {
                node {
                    id
                    featured_media {
                        localFile {
                            childImageSharp{
                                fluid (maxHeight:200, quality:80){
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                    base64
                                  }
                                }
                            }
                            source_url
                    }
                    slug
                    status
                    template
                }
            }
        }
        
        allWordpressPost {
            edges {
                node {
                    id  
                    slug
                    status
                    template
                    format
                    title
                    date(formatString: "MMMM DD, YYYY")
                    featured_media{
                        localFile {
                            childImageSharp{
                                fluid (maxHeight:200, quality:80){
                                    src
                                    srcSet
                                    aspectRatio
                                    sizes
                                    base64
                                  }
                                }
                            }
                            source_url
                    }
                }
            }
        }

        allSermonPost: allWordpressPost(filter: {categories: {elemMatch: {name: {eq: "Sermon"}}}}) {
            edges {
              node {
                id
                slug
                status
                template
                format
                title
                date(formatString: "MMMM DD, YYYY")
                featured_media {
                    localFile {
                        childImageSharp{
                            fluid (maxHeight:200, quality:80){
                                src
                                srcSet
                                aspectRatio
                                sizes
                                base64
                              }
                            }
                        }
                        source_url
                }
              }
            }
          }
    }
`;
