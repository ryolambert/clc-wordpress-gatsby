import React from 'react';
// @material-ui/core components
import withStyles from '@material-ui/core/styles/withStyles';

// @material-ui/icons

// core components
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import CustomInput from 'components/CustomInput/CustomInput.jsx';
import Button from 'components/CustomButtons/Button.jsx';

import workStyle from 'assets/jss/material-kit-react/views/landingPageSections/workStyle.jsx';

class WorkSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': form.getAttribute('name'),
        ...this.state
      })
    })
      .then(() => navigateTo(form.getAttribute('action')))
      .catch(error => alert(error));
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem cs={12} sm={12} md={8}>
            <h2 className={classes.title}>Drop us a line! 📝</h2>
            <h4 className={classes.description}>
              We love getting to know our community! We also extend warm
              welcomes to any and all- whether you're looking for a church while
              visiting Longbeach or need a new faith community that'll welcome
              you like family!
            </h4>
            <form
              name="contact"
              method="POST"
              action="/thanks/"
              data-netlify="true"
              data-netlify-recaptcha="true"
              data-netlify-honeypot="bot-field">
              <GridContainer>
                <p hidden>
                  <label>
                    Don’t fill this out:{' '}
                    <input name="bot-field" onChange={this.handleChange} />
                  </label>
                </p>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Name"
                    id="name"
                    onChange={this.handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={6}>
                  <CustomInput
                    labelText="Your Email"
                    id="email"
                    onChange={this.handleChange}
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <CustomInput
                  labelText="Your Message"
                  id="message"
                  onChange={this.handleChange}
                  formControlProps={{
                    fullWidth: true,
                    className: classes.textArea
                  }}
                  inputProps={{
                    multiline: true,
                    rows: 5
                  }}
                />
                <GridContainer justify="center">
                  <GridItem
                    xs={12}
                    sm={12}
                    md={4}
                    className={classes.textCenter}>
                    <Button
                      style={{ justify: 'center' }}
                      color="primary"
                      type="submit">
                      Send Message
                    </Button>
                  </GridItem>
                </GridContainer>
              </GridContainer>
            </form>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

export default withStyles(workStyle)(WorkSection);
