/* eslint-disable react/jsx-props-no-spreading */
//* __________________________Layout Wrapper Component_________________________*/
// ⚛ Component wraps up header, headerLinks, footer, and children for Appbar
// TODO: Get react-helmet setup for gql to inject siteMetadata

import React from 'react';
import PropTypes from 'prop-types';
// import Helmet from './node_modules/react-helmet';
import { graphql } from 'gatsby';
import Transition from '../components/Transition/Transition';
import Header from '../components/Header/Header';
import HeaderLinks from '../components/Header/HeaderLinks';
import Footer from '../components/Footer/Footer';
// import SEO from '../Seo';

import 'assets/scss/material-kit-react.scss?v=1.4.0';

const LAYOUT_PAGE_QUERY = graphql`
  query layoutPageQuery {
    site {
      id
      siteMetadata {
        title
        description
      }
    }
    siteSearchIndex {
      index
    }
  }
`;

class Layout extends React.Component {
  render() {
    const { children, location, ...rest } = this.props;
    const dashboardRoutes = [];
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Citylights Church"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 400,
            color: 'white',
          }}
          {...rest}
        />
        {/* <SEO></SEO> */}
        {/* TODO- Get props setup for query to pass properly */}
        {/* <Helmet>
          <meta name="description" content={data.site.} />
        </Helmet> */}
        <Transition location={location}>{children}</Transition>
        <Footer />
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
