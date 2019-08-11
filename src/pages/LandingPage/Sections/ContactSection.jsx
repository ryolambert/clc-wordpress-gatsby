import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from 'components/ContactForm/ContactForm.jsx';
import Map from 'components/Map/Map.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

const ContactSection = props => {
  const { classes, pageInfo, address, ...rest } = props;
  console.log(pageInfo);
  const location = pageInfo.address;
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <ContactForm />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Map
            className="leaflet-container"
            position={address}
            info={pageInfo}
          />
        </GridItem>
      </GridContainer>
    </div>
  );
};

ContactSection.propTypes = {
  classes: PropTypes.object,
  address: PropTypes.string,
  pageInfo: PropTypes.object
};

export default ContactSection;
