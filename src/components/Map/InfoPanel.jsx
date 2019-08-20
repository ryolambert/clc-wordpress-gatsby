import React, { PureComponent } from 'react';
import Img from 'gatsby-image';
// nodejs library that concatenates classes
import classNames from 'classnames';
// @material-ui/core components
import Button from 'components/CustomButtons/Button.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
// styling
import infoPanelStyle from 'assets/jss/material-kit-react/components/infoPanelStyle.jsx';

class InfoPanel extends PureComponent {
  render() {
    const { classes, info, position } = this.props;
    const encodedQuery = encodeURIComponent(position);

    return (
      <div className={classes.infoPanelContainer}>
        <h6 style={{ margin: '0px' }}>
          <strong
            className={classes.title}
            dangerouslySetInnerHTML={{
              __html: info.acf.event_location
                ? info.acf.event_location
                : info.acf.landing_location
                  ? info.acf.landing_location
                  : null,
            }}
          />
        </h6>
        <h3
          className={classes.subtitle}
          dangerouslySetInnerHTML={{
            __html: info.acf.event_location_description
              ? info.acf.event_location_description
              : info.acf.landing_location_description
                ? info.acf.landing_location_description
                : null,
          }}
        />
        {/* <p
          style={{ fontSize: '0.75rem' }}
          dangerouslySetInnerHTML={{
            __html: info.acf.event_start ? info.acf.event_start : null
          }}
        />
        <p
          style={{ fontSize: '0.75rem' }}
          dangerouslySetInnerHTML={{
            __html: info.acf.event_end ? info.acf.event_end : null
          }}
        /> */}
        <p
          style={{ fontSize: '0.75rem', lineHeight: '0.75rem' }}
          dangerouslySetInnerHTML={{
            __html: info.acf.event_address
              ? info.acf.event_address
              : info.acf.landing_address
                ? info.acf.landing_address
                : null,
          }}
        />
        <br />
        <div style={{ textAlign: 'center' }}>
          <Button
            size="sm"
            round
            style={{ textAlign: 'center' }}
            className={classes.directionsLink}
            color="warning"
          >
            <a
              style={{ fontSize: '0.75rem', color: 'white' }}
              target="_new"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`}
            >
              👉 Directions
            </a>
          </Button>
        </div>
      </div>
    );
  }
}

export default withStyles(infoPanelStyle)(InfoPanel);
