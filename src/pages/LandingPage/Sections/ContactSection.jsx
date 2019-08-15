import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from 'components/ContactForm/ContactForm.jsx';
import Map from 'components/Map/Map.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';

const ContactSection = props => {
  const { classes, pageInfo, address, ...rest } = props;
  const infoPanel = pageInfo;
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={11} sm={11} md={6}>
          <ContactForm />
        </GridItem>
        <GridItem xs={11} sm={11} md={6}>
          <Map position={address} info={pageInfo} />
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
