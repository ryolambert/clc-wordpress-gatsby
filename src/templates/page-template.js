//* Pages
// Core Imports
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// Component Imports
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';
import Footer from 'components/Footer/Footer';
import postPageStyle from '../assets/jss/material-kit-react/views/postPageStyle';

class PageTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const page = this.props.data.wordpressPage;
    const pageTitle = this.props.data.wordpressPage.title;
    const placeHolder = this.props.data.placeHolderImg.fluid;
    const fluid = page.featured_media
      ? page.featured_media.localFile.childImageSharp.fluid
      : placeHolder;
    const banner = {
      title: pageTitle,
      subTitle: '',
    };

    return (
      <div>
        <ParallaxLazy small filter fluid={fluid} banner={banner} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={10}>
                  {/* <h1 dangerouslySetInnerHTML={{ __html: page.title}}/> */}
                  <div
                    style={{ marginTop: '2vh' }}
                    dangerouslySetInnerHTML={{
                      __html: page.content,
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: page.date,
                    }}
                  />
                  <p
                    dangerouslySetInnerHTML={{
                      __html: page.slug,
                    }}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export const CURRENT_PAGE_QUERY = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      slug
      id
      date(formatString: "MMMM DD, YYYY")
    }
    placeHolderImg: imageSharp(
      original: { src: { regex: "/you-are-loved/" } }
    ) {
      fluid(maxWidth: 1200) {
        src
        ...GatsbyImageSharpFluid
      }
    }
    # site {
    #   id
    #   siteMetadata {
    #     title
    #   }
    # }
  }
`;

export default withStyles(postPageStyle)(PageTemplate);
