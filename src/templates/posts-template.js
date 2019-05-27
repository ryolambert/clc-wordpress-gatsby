import React, { Component } from 'react';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import PropTypes from 'prop-types';

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

import landingPageStyle from 'assets/jss/material-kit-react/views/landingPageStyle.jsx';

//todo: Add SEO

const NavLink = props => {
  if (!props.test) {
    return <Link to={props.url}>{props.text}</Link>;
  } else {
    return <span>{props.text}</span>;
  }
};

const dashboardRoutes = [];

//todo: Fix component formatting fo 

class IndexPage extends React.Component {
  render() {
    const { data, pageContext } = this.props;
    const { classes, ...rest } = this.props;
    const { group, index, first, last, pageCount } = pageContext;
    const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
    const nextUrl = (index + 1).toString();
    

    console.log(group);

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
        <div>
          <GridContainer>
            <GridItem xs={12} sm={12} md={10}>
              <h4>{pageCount} Pages</h4>

              {group.map(({ node }) => (
                <div
                  key={node.slug}
                  className={'post'}
                  style={{ marginBottom: 50 }}>
                  {node.featured_media &&
                    node.featured_media.localFile.childImageSharp
                      .resolutions && (
                      <div>
                        <Img
                          resolutions={
                            node.featured_media.localFile.childImageSharp
                              .resolutions
                          }
                        />
                      </div>
                    )}

                  <Link to={'/post/' + node.slug}>
                    <h3>{node.title}</h3>
                  </Link>

                  <div
                    className={'post-content'}
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />

                  {node.date}
                </div>
              ))}
              <div className="previousLink">
                <NavLink
                  test={first}
                  url={'/posts/' + previousUrl}
                  text="Go to Previous Page"
                />
              </div>
              <div className="nextLink">
                <NavLink
                  test={last}
                  url={'/posts/' + nextUrl}
                  text="Go to Next Page"
                />
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(IndexPage);
