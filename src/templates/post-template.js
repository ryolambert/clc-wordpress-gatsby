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

import fillerBackground from 'assets/img/profile-bg.jpg';
import profilePageStyle from 'assets/jss/material-kit-react/views/profilePage.jsx';

const dashboardRoutes = [];

class PostTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const post = this.props.data.wordpressPost;
    // const { data } = this.props;
    const fluid = post.featured_media
      ? post.featured_media.localFile.childImageSharp.fluid
      : { fillerBackground };

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
        <Parallax small filter image={fluid.src} />
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
            {/* </Parallax> */}
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
              ...GatsbyImageSharpFluid
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
