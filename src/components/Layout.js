import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import PropTypes from 'prop-types';
import '../assets/scss/material-kit-react.scss';

const Layout = ({ children }) => (
  <>
    <Header />
    <div className="site-content">{children}</div>
    <Footer />
  </>
);

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;