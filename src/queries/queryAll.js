'use strict'

module.exports = `
    {
        allWordpressPage {
            edges {
                node {
                    id
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
    }
`