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
import Map from 'components/Map/Map.jsx';

import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPageStyle.jsx';

// Sections for this page
import ProductSection from './Sections/ProductSection.jsx';
import TeamSection from './Sections/TeamSection.jsx';
import EventSection from './Sections/EventSection.jsx';
import BlogSection from './Sections/BlogSection.jsx';
import WorkSection from './Sections/WorkSection.jsx';
import ContactSection from './Sections/ContactSection.jsx';
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
            title
            excerpt
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
              landing_location
              landing_address
              landing_location_description
              values_one
              values_three
              values_two
              contact_form
            }
          }
        }
      }
      team: allWordpressPage(filter: { title: { eq: "Staff" } }) {
        edges {
          node {
            title
            content
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
  const pageInfo = data.landing.edges[0].node;
  const address = pageInfo.acf.landing_address;
  const landingParallax =
    data.landing.edges[0].node.acf.hero_image.localFile.childImageSharp.fluid;
  const fallBackParallaxImg = data.fallBackImg.fluid;
  const fluid = landingParallax ? landingParallax : fallBackParallaxImg;
  const title = data.landing.edges[0].node.acf.hero_title;
  const subTitle = data.landing.edges[0].node.acf.hero_content;
  const team = data.team.edges[0].node;

  const banner = {
    title: title,
    subTitle: subTitle
  };

  return (
    <Layout>
      <ParallaxLazy filter banner={banner} fluid={fluid}>
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
      </ParallaxLazy>
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div className={classes.container}>
          <ProductSection />
          <TeamSection teamInfo={team} />
          <EventSection />
          <BlogSection />
          <ContactSection address={address} pageInfo={pageInfo} />
        </div>
      </div>
    </Layout>
  );
}

export default withStyles(landingPageStyle)(LandingPage);
