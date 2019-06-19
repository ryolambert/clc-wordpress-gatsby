import React, { PureComponent } from 'react';
import Img from 'gatsby-image';

export default class Info extends PureComponent {
  render() {
    const { info } = this.props;
    const lat = info.position[1];
    const lng = info.position[0];
    const displayName = `${info.popupInfo.title}, ${info.popupInfo.excerpt}`;
    const fluidContent = info.popupInfo.featured_media
      ? info.popupInfo.featured_media.localFile.childImageSharp.fluid
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
                __html: info.popupInfo.acf.event_location
              }}
            />
          </h6>
          <p>
            <a
              style={{ fontSize: '0.75rem' }}
              target="_new"
              href={`https://www.google.com/maps/dir/?api=1&destination=${lat}, ${lng}`}>
              👉 Directions
            </a>
          </p>
          <br />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{ __html: info.popupInfo.acf.event_start }}
          />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{ __html: info.popupInfo.acf.event_end }}
          />
          <p
            style={{ fontSize: '0.5rem' }}
            dangerouslySetInnerHTML={{
              __html: info.popupInfo.acf.event_address
            }}
          />
          <br />
          {fluidContent && (
            <div>
              <Img
                style={{
                  width: 'auto',
                  maxWidth: '100%',
                  height: 'auto',
                  maxHeight: '30px'
                }}
                alt="Screenshot of Project"
                fluid={
                  info.popupInfo.featured_media.localFile.childImageSharp.fluid
                }
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
