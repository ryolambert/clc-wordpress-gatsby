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
      classes,
      filter,
      className,
      children,
      style,
      post,
      fluid,
      small
    } = this.props;
    // const fluid = post.featured_media
    //   ? post.featured_media.localFile.childImageSharp.fluid
    //   : { Image };
    const parallaxClasses = classNames({
      [classes.parallax]: true,
      [classes.filter]: filter,
      [classes.small]: small,
      [className]: className !== undefined
    });
    // console.info(post);

    // const titleClasses = classNames({
    //   [classes.container]: true,
    //   [classes.title]: true
    // });

    return (
      <div>
        <Img
          className={parallaxClasses}
          fluid={fluid}
          post={post}
          style={{
            filter: 'brightness(50%)',

            ...style,
            ...this.state
          }}
          ref="parallax"
        />
        <div className={classes.container}>
          <GridContainer justify="center">
            <GridItem xs={12} sm={12} md={12}>
              <h1
                // className={classes.title}
                style={
                  {
                    // marginTop: '5em',
                    // marginRight: '30vw',
                    // minHeight: '32px',
                    // color: '#FFFFFF',
                    // textDecoration: 'none',
                    // zIndex: '12',
                    // fontFamily: 'Roboto Slab',
                    // fontSize: '2em',
                    // fontWeight: '700'
                    // left: '50%',
                    // right: '50%',
                    // top: '80vh',
                    // marginBottom: '80%',
                    // paddingBottom: '20%'
                  }
                }>
                <strong dangerouslySetInnerHTML={{ __html: post.title }} />
              </h1>
              <h4 style={{}} className={classes.subtitle}>
                <strong dangerouslySetInnerHTML={{ __html: post.date }} />
              </h4>
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
  post: PropTypes.object
};

export default withStyles(parallaxLazyStyle)(Parallax);
