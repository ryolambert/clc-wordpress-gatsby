import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

// React icons
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';

// core components
import GridItem from 'components/Grid/GridItem.jsx';
import Button from 'components/CustomButtons/Button.jsx';
import Card from 'components/Card/Card.jsx';
import CardBody from 'components/Card/CardBody.jsx';
import CardFooter from 'components/Card/CardFooter.jsx';
import Img from 'gatsby-image';
import AniLink from 'gatsby-plugin-transition-link/AniLink';

import teamStyle from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx';

const TeamCard = ({
  fallBack,
  teamImg,
  teamName,
  teamPosition,
  teamExcerpt,
  ...props
}) => {
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgCentered
  );

  return (
    <GridItem xs={12} sm={12} md={4}>
      <Card plain>
        <GridItem xs={12} sm={12} md={6} className={classes.itemGrid}>
          {(teamImg || fallBack) && (
            <Img
              className={imageClasses}
              alt={teamName}
              justify="center"
              fluid={teamImg}
            />
          )}
        </GridItem>
        <h4 className={classes.cardTitle}>
          {teamName}
          <br />
          <small className={classes.smallTitle}>{teamPosition}</small>
        </h4>
        <CardBody>
          <p className={classes.description}>{teamExcerpt}</p>
        </CardBody>
        <CardFooter className={classes.justifyCenter}>
          <Button justIcon color="transparent" className={classes.margin5}>
            <FaTwitter />
          </Button>
          <Button justIcon color="transparent" className={classes.margin5}>
            <FaInstagram />
          </Button>
          <AniLink
            fade
            to="/staff/"
            className={classes.cardTitle}
            key={teamName}
          >
            <Button justIcon color="transparent" className={classes.margin5}>
              <ArrowForwardRounded />
            </Button>
          </AniLink>
        </CardFooter>
      </Card>
    </GridItem>
  );
};

TeamCard.propTypes = {
  fallBack: PropTypes.object,
  teamImg: PropTypes.object.isRequired,
  teamName: PropTypes.string.isRequired,
  teamPosition: PropTypes.string.isRequired,
  teamExcerpt: PropTypes.string.isRequired,
};

export default withStyles(teamStyle)(TeamCard);
