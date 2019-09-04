/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-danger */
import React from 'react';
// nodejs library that concatenates classes
import classNames from 'classnames';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// core components
import parallaxLazyStyle from 'assets/jss/material-kit-react/components/parallaxLazyStyle.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

import Img from 'gatsby-image';

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    const windowScrollTop =
      typeof window !== 'undefined' && window.pageYOffset / 3;
    this.state = {
      transform: `translate3d(0,${windowScrollTop}px,0)`,
    };
    this.resetTransform = this.resetTransform.bind(this);
  }

  componentDidMount() {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: `translate3d(0,${windowScrollTop}px,0)`,
    });
    window.addEventListener('scroll', this.resetTransform);
  }

  componentWillUnmount() {
    typeof window !== 'undefined' &&
      window.removeEventListener('scroll', this.resetTransform);
  }

  resetTransform() {
    const windowScrollTop =
      typeof window !== 'undefined' && window.pageYOffset / 3;
    this.setState({
      transform: `translate3d(0,${windowScrollTop}px,0)`,
    });
  }

  render() {
    const {
      banner,
      children,
      classes,
      className,
      color,
      filter,
      fluid,
      landingPage,
      leftSide,
      rightSide,
      small,
      style,
    } = this.props;

    const parallaxClasses = classNames({
      [classes.color]: color,
      [classes.filter]: filter,
      [classes.parallax]: true,
      [classes.small]: small,
      [className]: className !== undefined,
    });

    return (
      <div style={{ ...this.state }} ref="parallax">
        <Img
          className={parallaxClasses}
          fluid={fluid}
          backgroundColor="#ff6600"
          style={{
            filter: 'brightness(50%)',
            ...style,
          }}
        />
        <div className={classes.parallaxContainer}>
          <GridContainer className={classes.parallaxWrapper}>
            {landingPage}
            {banner && (
              <GridItem xs={6} sm={6} md={6}>
                <h1 className={classes.parallaxTitle}>
                  <strong
                    dangerouslySetInnerHTML={{
                      __html: banner.title ? banner.title : null,
                    }}
                  />
                </h1>
                <h4
                  dangerouslySetInnerHTML={{
                    __html: banner.subTitle ? banner.subTitle : null,
                  }}
                />
                <h5 className={classes.parallaxSubtitle}>
                  <strong
                    dangerouslySetInnerHTML={{
                      __html: banner.styledSubTitle
                        ? banner.styledSubTitle
                        : null,
                    }}
                  />
                </h5>
                {leftSide}
              </GridItem>
            )}
            {rightSide}
            {children}
          </GridContainer>
        </div>
      </div>
    );
  }
}

Parallax.propTypes = {
  banner: PropTypes.object,
  children: PropTypes.node,
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  color: PropTypes.bool,
  filter: PropTypes.bool,
  fluid: PropTypes.object,
  landingPage: PropTypes.node,
  leftSide: PropTypes.node,
  rightSide: PropTypes.node,
  style: PropTypes.string,
};

export default withStyles(parallaxLazyStyle)(Parallax);
