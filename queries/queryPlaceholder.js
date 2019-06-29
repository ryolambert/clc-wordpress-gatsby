const PLACEHOLDER_IMAGE_QUERY = graphql`
  query {
  imageSharp(original: {src: {regex: "/skyline/"}}) {
     fluid(maxWidth: 1200) {
        ...GatsbyImageSharpFluid
     }
   }
  }
`;

export default PLACEHOLDER_IMAGE_QUERY;
