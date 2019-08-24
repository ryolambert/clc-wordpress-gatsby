/* eslint-disable react/no-did-mount-set-state */
import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import parallaxLazyStyle from "assets/jss/material-kit-react/components/parallaxLazyStyle";
import GridContainer from "components/Grid/GridContainer";
import GridItem from "components/Grid/GridItem";

import Img from "gatsby-image";

class Parallax extends React.Component {
  constructor(props) {
    super(props);
    const windowScrollTop =
      typeof window !== "undefined" && window.pageYOffset / 3;
    this.state = {
      transform: `translate3d(0,${windowScrollTop}px,0)`
    };
    this.resetTransform = this.resetTransform.bind(this);
  }

  componentDidMount() {
    const windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: `translate3d(0,${windowScrollTop}px,0)`
    });
    window.addEventListener("scroll", this.resetTransform);
  }

  componentWillUnmount() {
    typeof window !== "undefined" &&
      window.removeEventListener("scroll", this.resetTransform);
  }

  resetTransform() {
    const windowScrollTop =
      typeof window !== "undefined" && window.pageYOffset / 3;
    this.setState({
      transform: `translate3d(0,${windowScrollTop}px,0)`
    });
  }

  render() {
    const { classes, filter, fluid, banner, small, style } = this.props;

    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className]: className !== undefined
    });
    // console.info(banner);

    // const titleClasses = classNames({
    //   [classes.container]: true,
    //   [classes.title]: true
    // });

    return (
      <div style={{ ...this.state }} ref="parallax">
        {/* <div className={classes.container}> */}
        <Img
          className={parallaxClasses}
          fluid={fluid}
          backgroundColor="#ff6600"
          style={{
            filter: "brightness(50%)",
            ...style
          }}
        />
        <div className={classes.parallaxContainer}>
          <GridContainer className={classes.parallaxWrapper}>
            <GridItem xs={11} sm={11} md={6}>
              <h1 className={classes.parallaxTitle}>
                <strong
                  dangerouslySetInnerHTML={{
                    __html: banner.title ? banner.title : null
                  }}
                />
              </h1>
              <h4
                dangerouslySetInnerHTML={{
                  __html: banner.subTitle ? banner.subTitle : null
                }}
              />
              <h5 className={classes.parallaxSubtitle}>
                <strong
                  dangerouslySetInnerHTML={{
                    __html: banner.styledSubTitle ? banner.styledSubTitle : null
                  }}
                />
              </h5>
              {children}
            </GridItem>
          </GridContainer>
        </div>
      </div>
    );
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  fluid: PropTypes.object,
  banner: PropTypes.object
};

export default withStyles(parallaxLazyStyle)(Parallax);
