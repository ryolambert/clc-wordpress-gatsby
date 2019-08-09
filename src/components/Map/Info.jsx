import React, { PureComponent } from 'react';
import Img from 'gatsby-image';

export default class Info extends PureComponent {
  render() {
    const { infoPanel } = this.props;
    const address = infoPanel.position;
    const encodedQuery = encodeURIComponent(address);
    const displayName = `${infoPanel.info.title}, ${infoPanel.info.excerpt}`;
    const fluidContent = infoPanel.info.featured_media
      ? infoPanel.info.featured_media.localFile.childImageSharp.fluid
      : null;

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
                __html: infoPanel.info.acf.event_location
                  ? infoPanel.info.acf.event_location
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
            dangerouslySetInnerHTML={{ __html: infoPanel.info.acf.event_start }}
          />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{ __html: infoPanel.info.acf.event_end }}
          />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{
              __html: infoPanel.info.acf.event_address
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
                fluid={
                  infoPanel.info.featured_media.localFile.childImageSharp.fluid
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
