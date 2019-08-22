import Grid from '@material-ui/core/Grid';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';
// nodejs library to set properties for components
import PropTypes from 'prop-types';
import React from 'react';

const style = theme => ({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(12, 1fr)',
    // gridGap: theme.spacing(1)
  },
  root: {
    flexGrow: 1,
  },
});

function GridContainer({ ...props }) {
  const { classes, children, className, ...rest } = props;
  return (
    <Grid
      container
      {...rest}
      className={classes.grid + ' ' + className}
      spacing={2}
    >
      {children}
    </Grid>
  );
}

GridContainer.defaultProps = {
  className: '',
};

GridContainer.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
};

export default withStyles(style)(GridContainer);
