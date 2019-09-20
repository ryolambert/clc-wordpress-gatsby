import React from 'react';
import PropTypes from 'prop-types';
import ContactForm from 'components/ContactForm/ContactForm';
// import Map from 'components/Map/Map';
import Card from 'components/Card/Card';
import InfoPanel from 'components/Map/InfoPanel';
import GridContainer from 'components/Grid/GridContainer';
import GridItem from 'components/Grid/GridItem';

const ContactSection = props => {
  const { classes, pageInfo, address, ...rest } = props;
  return (
    <div>
      <GridContainer justify="center">
        <GridItem xs={12} sm={12} md={6}>
          <Card plain>
            <ContactForm />
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
};

ContactSection.propTypes = {
  classes: PropTypes.object,
  address: PropTypes.string,
  pageInfo: PropTypes.object,
};

export default ContactSection;
