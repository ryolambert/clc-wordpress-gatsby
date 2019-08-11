import React, { PureComponent } from 'react';
import Img from 'gatsby-image';

export default class Info extends PureComponent {
  render() {
    const { infoPanel, position } = this.props;
    const encodedQuery = encodeURIComponent(position);
    const displayName = `${infoPanel.title}, ${infoPanel.excerpt}`;
    const fluidContent = infoPanel.featured_media
      ? infoPanel.featured_media.localFile.childImageSharp.fluid
      : null;
    console.log(infoPanel);

    return (
      <div
        style={{
          height: 'auto',
          maxHeight: '10vh',
          overflow: 'hidden',
          lineHeight: '0.5rem'
        }}>
        <div>
          <h6>
            <strong
              style={{ fontSize: '1rem', lineHeight: '1rem' }}
              dangerouslySetInnerHTML={{
                __html: infoPanel.acf.event_location
                  ? infoPanel.acf.event_location
                  : infoPanel.acf.location
                  ? infoPanel.acf.location
                  : null
              }}
            />
          </h6>
          <p>
            <a
              style={{ fontSize: '0.75rem' }}
              target="_new"
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodedQuery}`}>
              👉 Directions
            </a>
          </p>
          <br />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{
              __html: infoPanel.acf.event_start
                ? infoPanel.acf.event_start
                : null
            }}
          />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{
              __html: infoPanel.acf.event_end ? infoPanel.acf.event_end : null
            }}
          />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{
              __html: infoPanel.acf.event_address
                ? infoPanel.acf.event_address
                : infoPanel.acf.address
                ? infoPanel.acf.address
                : null
            }}
          />
          <br />
          {fluidContent && (
            <div>
              <Img
                style={{
                  width: 'auto',
                  maxWidth: '100%',
                  height: 'auto'
                }}
                alt="Screenshot of Project"
                fluid={infoPanel.featured_media.localFile.childImageSharp.fluid}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
