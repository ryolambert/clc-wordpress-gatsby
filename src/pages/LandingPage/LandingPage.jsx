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
import Layout from '../../components/Layout/Layout';

import landingPageStyle from '../../assets/jss/material-kit-react/views/landingPageStyle.jsx';

// Sections for this page
import ProductSection from './Sections/ProductSection.jsx';
import TeamSection from './Sections/TeamSection.jsx';
// import WorkSection from './Sections/WorkSection.jsx';
import ContactForm from '../../components/ContactForm/ContactForm';

// graphql query access to modify page content
import { graphql } from 'gatsby';

const dashboardRoutes = [];
// const LANDING_PAGE_QUERY = graphql

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <Layout>
        <Parallax filter image={require('assets/img/los-angeles-skyline.jpg')}>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>
                  <strong>Community Through Faith.</strong>
                </h1>

                <h4>
                  Every landing page needs a small description after the big
                  bold title, that's why we added this text here. Add here all
                  the information that can make you or your product create the
                  first impression.
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
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
            <TeamSection />
            {/* <WorkSection /> */}
            <ContactForm />
          </div>
        </div>
      </Layout>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
