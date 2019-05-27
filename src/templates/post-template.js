//* Individual Post Template
// Core Imports
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import Img from 'gatsby-image';

// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// React icons
import { FaPlay } from 'react-icons/fa';

// Component Imports
import Header from 'components/Header/Header.jsx';
import Footer from 'components/Footer/Footer.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';

import Image from 'components/image.js';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePageStyle.jsx';

const dashboardRoutes = [];

class PostTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const post = this.props.data.wordpressPost;
    // const { data } = this.props;
    const fluid = post.featured_media
      ? post.featured_media.localFile.childImageSharp.fluid
      : { Image };
    // const imagesFluid = post.featured_media.map(
    //   featured_media => featured_media.localFile.childImageSharp.fluid
    // );
    // const imgFluid = imagesFluid.map(imageFlu => ( <Img fluid={imageFlu} key={imageFlu.src} />)) };

    // Testing if featured_media fluid works
    console.log(fluid);

    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand=""
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white'
          }}
          {...rest}
        />
        {/* <Parallax filter image ={require(`<Img fluid={post.featured_media.localFile.childImageSharp.fluid} style={{ maxHeight: 680}}/>`)}> */}
        {/* //todo: fix default parallax image for specific gatsby query filler bg image */}
        <Parallax small filter image={fluid.src}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={10}>
                <h1
                  style={{
                    display: 'inline-block',
                    position: 'relative',
                    marginTop: '30px',
                    minHeight: '32px',
                    color: '#FFFFFF',
                    textDecoration: 'none',
                    zIndex: '12',
                    fontFamily: 'Roboto Slab',
                    fontWeight: '700'
                  }}>
                  {post.title}
                </h1>
                <h4>{post.author}</h4>
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                {/* <GridItem xs={12} sm={12} md={12}>
            {fluid &&
                    <div>
                        <Img fluid={fluid}/>
                        < img src={fluid.src} alt=""/>
                    </div>
                }

            </GridItem> */}
                <GridItem xs={12} sm={12} md={10}>
                  <h1>{post.title}</h1>
                  <Img
                    title={post.title}
                    alt="Screenshot of Project"
                    sizes={fluid}
                    className="card-img_src center-block"
                  />
                  <div
                    dangerouslySetInnerHTML={{
                      __html: post.content
                    }}
                  />
                  <p dangerouslySetInnerHTML={{ __html: post.date }} />
                  <p dangerouslySetInnerHTML={{ __html: post.slug }} />
                </GridItem>
              </GridContainer>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    );
  }
}

export const query = graphql`
  query currentPostQuery($id: String!) {
    wordpressPost(id: { eq: $id }) {
      title
      content
      featured_media {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1200) {
              src
              ...GatsbyImageSharpFluid_withWebp_tracedSVG
            }
          }
        }
      }
      slug
      id
      date(formatString: "MMMM DD, YYYY")
    }
    site {
      id
      siteMetadata {
        title
      }
    }
  }
`;

export default withStyles(profilePageStyle)(PostTemplate);
