'use strict'

module.exports = `
    {
        allWordpressPage {
            edges {
                node {
                    id
                    featured_media {
                        localFile {
                            childImageSharp {
                                fluid(maxWidth: 1200, traceSVG: {
                                    color: "lightgray",
                                    optTolerance: 0.4,
                                    turdSize: 100,
                                    turnPolicy: TURNPOLICY_MAJORITY,
                                }){
                                    src
                                    srcSet
                                    srcWebp
                                    tracedSVG
                                }
                            }
                        }
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
                        localFile{
                            childImageSharp{
                                fluid(maxWidth: 1200, traceSVG: {
                                    color: "lightgray",
                                    optTolerance: 0.4,
                                    turdSize: 100,
                                    turnPolicy: TURNPOLICY_MAJORITY,
                                }){
                                    src
                                    srcSet
                                    srcWebp
                                    tracedSVG
                                }
                            }
                        }
                    }
                }
            }
        }

        allSermonPost: allWordpressPost(filter: { acf: { category: { eq: "Sermon" } } }) {
            edges {
              node {
                id
                slug
                status
                template
                format
                title
                date
                featured_media {
                  localFile {
                    childImageSharp {
                      fluid(
                        maxWidth: 1200
                        traceSVG: {
                          color: "#fd9551"
                          optTolerance: 0.4
                          turdSize: 100
                          turnPolicy: TURNPOLICY_MAJORITY
                        }
                      ) {
                        src
                      }
                    }
                  }
                }
              }
            }
          }
    }
`