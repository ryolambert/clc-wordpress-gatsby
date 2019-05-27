//*__________________________Layout Wrapper Component_________________________*/
//⚛ Component wraps up header, headerLinks, footer, and children for Appbar
//TODO: Get react-helmet setup for gql to inject siteMetadata 

import React from 'react';
import Helmet from 'react-helmet';
import Header from '../Header/Header.jsx';
import HeaderLinks from '../Header/HeaderLinks.jsx';
import Footer from '../Footer/Footer.jsx';
import { graphql } from 'gatsby';

import 'assets/scss/material-kit-react.scss?v=1.4.0';
import 'typeface-roboto';
import 'typeface-roboto-slab';

const LANDING_PAGE_QUERY = graphql`
query landingPageQuery {
  site {
    id
    siteMetadata {
      title
      description
    }
  }
}
`;

export default class Layout extends React.Component {
  render() {
    const { children, ...rest } = this.props;
    const site= this.props;
    const data = this.props.data;
    const dashboardRoutes = [];
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
        {/*TODO- Get props setup for query to pass properly */}
        {/* <Helmet>
          <meta name="description" content={data.site.} />
        </Helmet> */}
        {children}
        <Footer />
      </div>
    );
  }
}
