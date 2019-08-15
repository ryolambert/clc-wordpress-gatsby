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
    var windowScrollTop =
      typeof window !== 'undefined' && window.pageYOffset / 3;
    this.state = {
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
    };
    this.resetTransform = this.resetTransform.bind(this);
  }
  componentDidMount() {
    var windowScrollTop = window.pageYOffset / 3;
    this.setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
    });
    window.addEventListener('scroll', this.resetTransform);
  }
  componentWillUnmount() {
    typeof window !== 'undefined' &&
      window.removeEventListener('scroll', this.resetTransform);
  }
  resetTransform() {
    var windowScrollTop =
      typeof window !== 'undefined' && window.pageYOffset / 3;
    this.setState({
      transform: 'translate3d(0,' + windowScrollTop + 'px,0)'
    });
  }
  render() {
    const {
      children,
      classes,
      className,
      color,
      filter,
      fluid,
      post,
      small,
      style
    } = this.props;

    const parallaxClasses = classNames({
      [classes.color]: color,
      [classes.filter]: filter,
      [classes.parallax]: true,
      [classes.small]: small,
      [className]: className !== undefined
    });
    // console.info(post);

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
          post={post}
          backgroundColor="#ff6600"
          style={{
            filter: 'brightness(50%)',
            ...style
          }}
        />
        {children}
      </div>
    );
  }
}

Parallax.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  colorFilter: PropTypes.bool,
  filter: PropTypes.bool,
  children: PropTypes.node,
  style: PropTypes.string,
  fluid: PropTypes.object,
  post: PropTypes.object
};

export default withStyles(parallaxLazyStyle)(Parallax);
