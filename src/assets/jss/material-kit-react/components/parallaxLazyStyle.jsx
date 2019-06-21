import { container, title } from 'assets/jss/material-kit-react.jsx';

const parallaxStyle = theme => ({
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
    alignItems: 'center',
    backgroundSize: 'cover',
    top: 0,
    left: 0,
    right: 0,
    bottom: '20vh'
  },
  filter: {
    '&:before': {
      background: 'rgba(0, 0, 0, 0.3)'
    },
    '&:after,&:before': {
      position: 'absolute',
      zIndex: '1',
      width: '100%',
      height: '100%',
      display: 'block',
      left: '0',
      top: '0',
      content: "''"
    }
  },
  small: {
    height: '340px'
  },
  //TODO: 📏📐This parallax effect to keep text within the middle of the 📸
  container: {
    position: 'fixed',
    zIndex: '1',
    color: '#FFFFFF',
    padding: 'auto',
    top: '0',
    right: '0',
    left: '0',
    width: '100%',
    height: '340px',
    ...container
  },
  gridItem: {
    top: '0%',
    margin: 'auto',
    alignContent: 'center',
    flexDirection: 'column',
    verticalAlign: 'middle'
  },
  title: {
    ...title,
    order: '-1',
    textAlign: 'left',
    // fontSize: '3em',
    color: '#FFFFFF',
    marginTop: '30px',
    minHeight: '12px',
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
      fontSize: '2.25rem',
      lineHeight: '1.5em',
      '&:after': {
        fontSize: '2rem',
        lineHeight: '1.4em'
      }
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '1.5635rem',
      lineHeight: '1.4em',
      '&:after': {
        fontSize: '1.124rem',
        lineHeight: '1.5em'
      }
    }
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    display: 'block',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none',
    zIndex: '12',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1em',
      '&:after': {
        fontSize: '0.8em'
      }
    },
    fontFamily: 'Roboto',
    margin: '0px 10% 0'
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
});

export default parallaxStyle;
