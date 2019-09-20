/*eslint-disable*/
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
import classNames from 'classnames';
import { List, ListItem, withStyles } from '@material-ui/core';

// @material-ui/icons
import Favorite from '@material-ui/icons/Favorite';

import footerStyle from 'assets/jss/material-kit-react/components/footerStyle.jsx';

function Footer({ ...props }) {
  const { classes, whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont,
  });
  return (
    <footer className={footerClasses} style={{ position: 'relative', zIndex: '1' }}>
      <div className={classes.container}>
        <div className={classes.left}>
          <List className={classes.list}>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.relevantdesign.org/"
                className={classes.block}
                target="_blank"
              >
                Relevant Design
              </a>
            </ListItem>
            <ListItem className={classes.inlineBlock}>
              <a
                href="https://relevantdesign.org/#2"
                className={classes.block}
                target="_blank"
              >
                About
              </a>
            </ListItem>
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="http://blog.relevantdesign.org/"
                className={classes.block}
                target="_blank">
                Blog
              </a>
            </ListItem> */}
            {/* <ListItem className={classes.inlineBlock}>
              <a
                href="https://www.relevantdesign.org/licenses"
                className={classes.block}
                target="_blank">
                Licenses
              </a>
            </ListItem> */}
          </List>
        </div>
        <div className={classes.right}>
          &copy; {1900 + new Date().getYear()} , made with{' '}
          <Favorite className={classes.icon} /> by{' '}
          <a
            href="https://relevantdesign.org"
            className={aClasses}
            target="_blank"
          >
            Relevant Design
          </a>{' '}
          for a better web.
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  whiteFont: PropTypes.bool,
};

export default withStyles(footerStyle)(Footer);
