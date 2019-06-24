import { container, title } from 'assets/jss/material-kit-react.jsx';
import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx';
import { cardTitle } from 'assets/jss/material-kit-react.jsx';

const landingPageStyle = theme => ({
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
    alignItems: 'center'
  },
  // gridItem: {
  //   top: '0%',
  //   margin: 'auto',
  //   alignContent: 'center',
  //   flexDirection: 'column',
  //   verticalAlign: 'middle'
  // },
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
  root: {
    flexGrow: 1
  },
  cardTitle,
  textMuted: {
    color: '#6c757d'
  },
  container,
  description: {
    margin: '1.071rem auto 0',
    maxWidth: '600px',
    color: '#999',
    textAlign: 'center !important'
  },
  name: {
    marginTop: '-80px'
  },
  ...imagesStyle,
  card: {
    display: 'flex',
    flexWrap: 'wrap',
    minHeight: '200px'
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  content: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    minHeight: '100%',
    paddingLeft: '20px',
    paddingBottom: '10px',
    minWidth: '400px',
    flexGrow: 3,
    flexBasis: '400px'
  },
  cover: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    height: '100%',
    maxHeight: '250px'
  },
  coverImg: {
    height: '100%',
    maxHeight: '250px'
  },
  excerpt: {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box',
    webkitBoxOrient: 'vertical',
    webkitLineClamp: '3',
    lineHeight: '1rem',
    maxHeight: '3rem',
    fontSize: '1rem'
  }
});

export default landingPageStyle;
