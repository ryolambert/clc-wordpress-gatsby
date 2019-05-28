//* Pages
// Core Imports
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

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

import profilePageStyle from 'assets/jss/material-kit-react/views/profilePageStyle.jsx';

const dashboardRoutes = [];

class PageTemplate extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    const { data } = this.props;
    // const post = this.props.data.wordpressPost;
    // const fluid = post.featured_media
    //   ? post.featured_media.localFile.childImageSharp.fluid
    //   : null;

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
        {/* <Parallax small filter image={fluid.src} /> */}
        {/* //todo : Setup with a default image for fluid to use in case of no featured media */}
        <Parallax small filter image={require("assets/img/bg3.jpg")} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={10}>
               <h1>{data.wordpressPage.title}</h1>
               <div
                  dangerouslySetInnerHTML={{
                   __html: data.wordpressPage.content
                  }}
               />
                <p
                  dangerouslySetInnerHTML={{ __html: data.wordpressPage.date }}
               />
               <p
                 dangerouslySetInnerHTML={{ __html: data.wordpressPage.slug }}
               />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      </div>
    );
  }
}

export const CURRENT_PAGE_QUERY = graphql`
  query currentPageQuery($id: String!) {
    wordpressPage(id: { eq: $id }) {
      title
      content
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

export default withStyles(profilePageStyle)(PageTemplate);
