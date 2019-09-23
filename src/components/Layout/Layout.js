/* eslint-disable react/jsx-props-no-spreading */
//* __________________________Layout Wrapper Component_________________________*/
// ⚛ Component wraps up header, headerLinks, footer, and children for Appbar
// TODO: Get react-helmet setup for gql to inject siteMetadata

import React from 'react';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import Header from '../Header/Header.jsx';
import HeaderLinks from '../Header/HeaderLinks.jsx';
import Footer from '../Footer/Footer.jsx';
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

export default class Layout extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    const dashboardRoutes = [];
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Citylights Church"
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
        {children}
        {/* <Footer /> */}
      </div>
    );
  }
}
