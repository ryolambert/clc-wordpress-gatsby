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
import Layout from 'components/Layout/Layout.js';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardHeader from 'components/Card/CardHeader.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Button from 'components/CustomButtons/Button.jsx';
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
      <Layout>
        <Parallax small filter image={require('assets/img/elysian-park.jpg')} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={10} justify="center">
              <h4 style={{textAlign: 'center'}}>{pageCount} Pages</h4>
              {group.map(({ node }) => (
                <Card
                  key={node.slug}
                  classes="card"
                  className=""
                  style={{ marginBottom: 50 }}>
                  {node.featured_media &&
                    node.featured_media.localFile.childImageSharp
                      .resolutions && (
                      <CardHeader>
                        <Img
                          className={classes.imgRoundedCircle}
                          resolutions={
                            node.featured_media.localFile.childImageSharp
                              .resolutions
                          }
                        />
                      </CardHeader>
                    )}

                  <Link to={'/post/' + node.slug}>
                    <h3>{node.title}</h3>
                  </Link>

                  <CardBody
                    className={'post-content'}
                    dangerouslySetInnerHTML={{ __html: node.excerpt }}
                  />
                  <CardFooter>{node.date}</CardFooter>
                </Card>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button color="warning">
                  <NavLink
                    test={first}
                    url={'/posts/' + previousUrl}
                    text="Go to Previous Page"
                  />
                </Button>
                <Button color="warning">
                  <NavLink
                    test={last}
                    url={'/posts/' + nextUrl}
                    text="Go to Next Page"
                  />
                </Button>
              </div>
            </GridItem>
          </GridContainer>
        </div>
      </Layout>
    );
  }
}

export default withStyles({landingPageStyle, })(IndexPage);
