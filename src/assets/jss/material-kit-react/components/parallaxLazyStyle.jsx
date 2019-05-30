import { container, title } from 'assets/jss/material-kit-react.jsx';

const parallaxStyle = {
  parallax: {
    height: '90vh',
    maxHeight: '1000px',
    overflow: 'hidden',
    position: 'relative',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    margin: '0',
    padding: '0',
    border: '0',
    display: 'flex',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    // position: 'absolute',
    zIndex: '1'
  },
  filter: {
    '&:before': {
      background: 'rgba(0, 0, 0, 0.7)'
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '-1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: "''"
    }
  },
  small: {
    height: '380px'
  },
  //TODO: 📏📐This parallax effect to keep text within the middle of the 📸
  container: {
    zIndex: '12',
    color: '#FFFFFF',
    position: 'absolute',
    padding: 'auto',
    top: '0',
    left: '20%',
    marginRight: '50%',
    marginLeft: '50%',
    marginTop: '20%',
    width: '100%',
    height: '100%',
    ...container
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    // marginLeft: 'auto',
    // marginRight: 'auto',
    // marginTop: '20%',
    // minHeight: '50%',
    textAlign: 'left',
    fontSize: '2em',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  subtitle: {
    // fontSize: '1.313rem',
    maxWidth: '500px',
    display: 'block',
    // position: 'relative',
    // marginTop: '5px',
    // marginRight: '50vw',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
    zIndex: '12',
    fontFamily: 'Roboto',
    fontSize: '1em',
    margin: '5px auto 0'
  },
  main: {
    background: '#FFFFFF',
    position: 'relative',
    zIndex: '3'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  }
};

export default parallaxStyle;
