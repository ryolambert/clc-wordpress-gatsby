/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-shadow */
/* eslint-disable no-negated-condition */
//
import React from 'react';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
// nodejs library that concatenates classes
// eslint-disable-next-line no-unused-vars
import classNames from 'classnames';

// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
import Button from 'components/CustomButtons/Button';
import Link from 'gatsby';
import simplePaginationStyle from 'assets/jss/material-kit-react/components/simplePaginationStyle';

function SimplePagination({ color, pageContext, ...props }) {
  const { classes, route } = props;
  const { index, first, last, pageCount } = pageContext;
  const NavLink = props => {
    if (!props.test) {
      return (
        <Button
          size="sm"
          round
          color={`${color}`}
          className={classes.paginationLink}
        >
          <Link
            style={{
              color: '#fff',
              textShadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)',
            }}
            to={props.url}
          >
            {props.text}
          </Link>
        </Button>
      );
    } else {
      return (
        <Button
          size="sm"
          round
          color={`${color}`}
          className={classes.paginationLink}
        >
          <span style={{ filter: 'brightness(50%)' }}>{props.text}</span>
        </Button>
      );
    }
  };

  const previousUrl = index - 1 == 1 ? '' : (index - 1).toString();
  const nextUrl = (index + 1).toString();

  return (
    <div className={classes.pagination}>
      <NavLink test={first} url={`/${route}/`} text="<<" />
      <NavLink test={first} url={`/${route}/${previousUrl}`} text="<" />
      <h4 className={classes.paginationItem}>
        Page {index} of {pageCount}
      </h4>
      <NavLink test={last} url={`/${route}/${nextUrl}`} text=">" />
      <NavLink test={last} url={`/${route}/${pageCount}`} text=">>" />
    </div>
  );
}

SimplePagination.defaultProps = {
  color: 'primary',
};

SimplePagination.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  pageContext: PropTypes.object.isRequired,
  color: PropTypes.oneOf(['primary', 'info', 'success', 'warning', 'danger']),
};

export default withStyles(simplePaginationStyle)(SimplePagination);
