import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// React icons
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Img from 'gatsby-image';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import teamStyle from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx';

import team1 from 'assets/img/faces/avatar.jpg';
import team2 from 'assets/img/faces/christian.jpg';
import team3 from 'assets/img/faces/kendall.jpg';

const TeamSection = ({ fallBack, teamInfo, ...props }) => {
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  console.log('TEAM SECTION TEST');
  console.log(teamInfo);

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                {(teamInfo.acf.team_one_image.localFile.childImageSharp.fluid ||
                  fallBack) && (
                  <Img
                    className={imageClasses}
                    alt={teamInfo.acf.team_one_name}
                    fluid={
                      teamInfo.acf.team_one_image.localFile.childImageSharp
                        .fluid
                    }
                  />
                )}
              </GridItem>
              <h4 className={classes.cardTitle}>
                {teamInfo.acf.team_one_name}
                <br />
                <small className={classes.smallTitle}>
                  {teamInfo.acf.team_one_position}
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  {teamInfo.acf.team_one_excerpt}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <FaTwitter />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <FaInstagram />
                </Button>
                <AniLink
                  fade
                  to={`/staff/`}
                  className={classes.cardTitle}
                  key={teamInfo.team_one_name}
                >
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <ArrowForwardRounded />
                  </Button>
                </AniLink>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                {(teamInfo.acf.team_two_image.localFile.childImageSharp.fluid ||
                  fallBack) && (
                  <Img
                    className={imageClasses}
                    alt={teamInfo.acf.team_two_name}
                    fluid={
                      teamInfo.acf.team_two_image.localFile.childImageSharp
                        .fluid
                    }
                  />
                )}
              </GridItem>
              <h4 className={classes.cardTitle}>
                {teamInfo.acf.team_two_name}
                <br />
                <small className={classes.smallTitle}>
                  {teamInfo.acf.team_two_position}
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  {teamInfo.acf.team_two_excerpt}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <FaTwitter />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <FaInstagram />
                </Button>
                <AniLink
                  fade
                  to={`/staff/`}
                  className={classes.cardTitle}
                  key={teamInfo.team_two_name}
                >
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <ArrowForwardRounded />
                  </Button>
                </AniLink>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <Card plain>
              <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
                {(teamInfo.acf.team_three_image.localFile.childImageSharp
                  .fluid ||
                  fallBack) && (
                  <Img
                    className={imageClasses}
                    alt={teamInfo.acf.team_three_name}
                    fluid={
                      teamInfo.acf.team_three_image.localFile.childImageSharp
                        .fluid
                    }
                  />
                )}
              </GridItem>
              <h4 className={classes.cardTitle}>
                {teamInfo.acf.team_three_name}
                <br />
                <small className={classes.smallTitle}>
                  {teamInfo.acf.team_three_position}
                </small>
              </h4>
              <CardBody>
                <p className={classes.description}>
                  {teamInfo.acf.team_three_excerpt}
                </p>
              </CardBody>
              <CardFooter className={classes.justifyCenter}>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <FaTwitter />
                </Button>
                <Button
                  justIcon
                  color="transparent"
                  className={classes.margin5}
                >
                  <FaInstagram />
                </Button>
                <AniLink
                  fade
                  to={`/staff/`}
                  className={classes.cardTitle}
                  key={teamInfo.team_three_name}
                >
                  <Button
                    justIcon
                    color="transparent"
                    className={classes.margin5}
                  >
                    <ArrowForwardRounded />
                  </Button>
                </AniLink>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    </div>
  );
};

export default withStyles(teamStyle)(TeamSection);
