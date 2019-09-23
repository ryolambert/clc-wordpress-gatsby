import React from 'react';
import PropTypes from 'prop-types';
import { graphql, useStaticQuery } from 'gatsby';
import classNames from 'classnames';
import withStyles from '@material-ui/core/styles/withStyles';

// React icons
import { FaTwitter, FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa';
import ArrowForwardRounded from '@material-ui/icons/ArrowForwardRounded';

// core components
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';
import Button from 'components/CustomButtons/Button';
import TeamCard from 'components/LandingPage/TeamCard';

import teamStyle from 'assets/jss/material-kit-react/views/landingPageSections/teamStyle.jsx';

const TeamSection = ({ fallBack, ...props }) => {
  const data = useStaticQuery(graphql`
    query teamSectionQuery {
      team: allWordpressPage(filter: { title: { eq: "Landing Page" } }) {
        edges {
          node {
            acf {
              team_one_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 360) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              team_one_name
              team_one_position
              team_one_excerpt
              team_one_phone
              team_one_email
              team_two_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 360) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              team_two_name
              team_two_position
              team_two_excerpt
              team_two_phone
              team_two_email
              team_three_image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 360) {
                      ...GatsbyImageSharpFluid_withWebp
                    }
                  }
                }
              }
              team_three_name
              team_three_position
              team_three_excerpt
              team_three_phone
              team_three_email
            }
          }
        }
      }
    }
  `);
  const teamInfo = data.team.edges[0].node.acf;
  const { classes } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgCentered
  );
  console.log('TEAM SECTION TEST');
  // console.log(teamInfo.team_one_image);
  // console.log(teamInfo.acf);

  return (
    <div className={classes.section}>
      <h2 className={classes.title}>Here is our team</h2>
      <div>
        <GridContainer>
          <TeamCard
            fallBack={fallBack}
            teamImg={teamInfo.team_one_image.localFile.childImageSharp.fluid}
            teamName={teamInfo.team_one_name}
            teamPosition={teamInfo.team_one_position}
            teamExcerpt={teamInfo.team_one_excerpt}
          />
          <TeamCard
            fallBack={fallBack}
            teamImg={teamInfo.team_two_image.localFile.childImageSharp.fluid}
            teamName={teamInfo.team_two_name}
            teamPosition={teamInfo.team_two_position}
            teamExcerpt={teamInfo.team_two_excerpt}
          />
          <TeamCard
            fallBack={fallBack}
            teamImg={teamInfo.team_three_image.localFile.childImageSharp.fluid}
            teamName={teamInfo.team_three_name}
            teamPosition={teamInfo.team_three_position}
            teamExcerpt={teamInfo.team_three_excerpt}
          />
        </GridContainer>
      </div>
    </div>
  );
};

TeamSection.propTypes = {
  fallBack: PropTypes.object,
};

export default withStyles(teamStyle)(TeamSection);
