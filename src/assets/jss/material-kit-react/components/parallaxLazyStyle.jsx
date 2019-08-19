import { container, title } from 'assets/jss/material-kit-react.jsx';

const parallaxStyle = theme => ({
  container: {
    zIndex: '12',
    justifyContent: 'center',
    ...container
  },
  parallaxContainer: {
    position: 'fixed',
    zIndex: '1',
    color: '#FFFFFF',
    padding: 'auto',
    top: '0',
    right: '0',
    left: '0',
    width: '100%',
    height: '100%',
    maxHeight: '1000px',
    ...container
  },
  parallaxWrapper: {
    height: '100%',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      paddingLeft: '15px',
      paddingRight: '15px'
    }
  },
  parallaxTitle: {
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
  parallaxSubtitle: {
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
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    color: '#FFFFFF',
    textDecoration: 'none'
  },
  subtitle: {
    fontSize: '1.313rem',
    maxWidth: '500px',
    margin: '10px auto 0'
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
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)',
    [theme.breakpoints.down('sm')]: {
      margin: '-60px 0px 0px'
    }
  },
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
      '&:before': {
        background: 'rgba(0,0,0,0.3)'
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
  color: {
    '&:before': {
      background: 'rgba(41,159,255,0.4)',
      background:
        '-moz-linear-gradient(25deg, rgba(103,215,249,0.5) 0%, rgba(54,54,247,0.5) 53%, rgba(83,27,250,0.2) 100%)',
      background:
        '-webkit-gradient(left bottom, right top, color-stop(0%, rgba(41,159,255,0.4)), color-stop(50%, rgba(115,15,255,0.3)), color-stop(50%, rgba(115,15,255,0.3)), color-stop(100%, rgba(195,39,230,0.23)))',
      background:
        '-webkit-linear-gradient(25deg, rgba(103,215,249,0.5) 0%, rgba(54,54,247,0.5) 53%, rgba(83,27,250,0.2) 100%)',
      background:
        '-o-linear-gradient(25deg, rgba(103,215,249,0.5) 0%, rgba(54,54,247,0.5) 53%, rgba(83,27,250,0.2) 100%)',
      background:
        '-ms-linear-gradient(25deg, rgba(103,215,249,0.5) 0%, rgba(54,54,247,0.5) 53%, rgba(83,27,250,0.2) 100%)',
      background:
        'linear-gradient(190deg, rgba(149,0,251,0.3) 0%, rgba(25,25,187,0.3) 47%, rgba(0,212,255,0.3) 86%)'
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
