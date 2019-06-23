import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// React icons
import { FaPlay } from 'react-icons/fa';

// core components
import Header from 'components/Header/Header.jsx';
import Footer from 'components/Footer/Footer.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import HeaderLinks from 'components/Header/HeaderLinks.jsx';
import Parallax from 'components/Parallax/Parallax.jsx';
import Layout from '../../components/Layout/Layout.js';
import ParallaxLazy from 'components/Parallax/ParallaxLazy.jsx';

import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPageStyle.jsx';

// Sections for this page
import ProductSection from './Sections/ProductSection.jsx';
import TeamSection from './Sections/TeamSection.jsx';
import EventSection from './Sections/EventSection.jsx';
import WorkSection from './Sections/WorkSection.jsx';
import ContactForm from '../../components/ContactForm/ContactForm';

// graphql query access to modify page content
import { graphql, useStaticQuery } from 'gatsby';

const dashboardRoutes = [];
// const LANDING_PAGE_QUERY = graphql

function LandingPage(props) {
  const data = useStaticQuery(graphql`
    query landingPageQuery {
      landing: allWordpressPage(filter: { title: { eq: "Landing Page" } }) {
        edges {
          node {
            acf {
              hero_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 1200) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              hero_content
              hero_title
              location
              values_one
              values_three
              values_two
              contact_form
              address
            }
          }
        }
      }
      galleryIndexParallaxImg: allWordpressWpMedia(
        sort: { order: DESC, fields: date }
        filter: { mime_type: { regex: "/image/" } }
      ) {
        edges {
          node {
            title
            mime_type
            media_type
            localFile {
              childImageSharp {
                fluid(maxWidth: 1200) {
                  ...GatsbyImageSharpFluid_withWebp
                }
              }
            }
          }
        }
      }
      fallBackImg: imageSharp(
        original: { src: { regex: "/sermons-background/" } }
      ) {
        fluid(maxWidth: 1200) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  `);
  const { classes, ...rest } = props;
  const landingParallax =
    data.landing.edges[0].node.acf.hero_image.localFile.childImageSharp.fluid;
  const fallBackParallaxImg = data.fallBackImg.fluid;
  const fluid = landingParallax ? landingParallax : fallBackParallaxImg;
  const title = data.landing.edges[0].node.acf.hero_title;
  const subtitle = data.landing.edges[0].node.acf.hero_content;

  const post = {
    title: title,
    date: subtitle
  };

  return (
    <Layout>
      <ParallaxLazy filter fluid={fluid}>
        <div className={classes.parallaxContainer}>
          <GridContainer className={classes.parallaxWrapper}>
            <GridItem xs={12} sm={12} md={6}>
              <h1 className={classes.parallaxTitle}>
                <strong>Community Through Faith.</strong>
              </h1>

              <h4>
                Every landing page needs a small description after the big bold
                title, that's why we added this text here. Add here all the
                information that can make you or your product create the first
                impression.
              </h4>
              <br />
              <Button
                color="warning"
                size="lg"
                href="https://www.youtube.com/watch?v=YfRlP2VEDEI"
                target="_blank"
                rel="noopener noreferrer">
                <FaPlay />
                Watch video
              </Button>
            </GridItem>
          </GridContainer>
        </div>
      </ParallaxLazy>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection />
          <EventSection />
          <ContactForm />
        </div>
      </div>
    </Layout>
  );
}

export default withStyles(landingPageStyle)(LandingPage);
