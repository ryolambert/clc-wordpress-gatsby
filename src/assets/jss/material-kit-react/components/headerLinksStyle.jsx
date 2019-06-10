import { defaultFont } from 'assets/jss/material-kit-react.jsx';

import tooltip from 'assets/jss/material-kit-react/tooltipsStyle.jsx';

const headerLinksStyle = theme => ({
  list: {
    ...defaultFont,
    fontSize: '0.5rem',
    margin: 0,
    paddingLeft: '0',
    listStyle: 'none',
    paddingTop: '0',
    paddingBottom: '0',
    color: 'inherit',
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      maxHeight: '80vh',
      width: '100%',
      height: '90%',
      boxSizing: 'content-box',
      marginBottom: '10vh',
      paddingBottom: '10vh',
      overflow: 'auto',
      paddingRight: '17px'
    }
  },
  listItem: {
    float: 'left',
    color: 'inherit',
    position: 'relative',
    width: 'auto',
    margin: '0',
    padding: '0',
    order: '-1',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '5px',
      order: '1'
    },
    '&:hover, &:focus': {
      color: 'inherit',
      textDecoration: 'none',
      textShadow: '0.05em 0.08em 0.2em rgba(255,255,255,.85)'
    }
  },
  listItemSearch: {
    float: 'left',
    color: 'inherit',
    position: 'relative',
    width: 'auto',
    margin: '0',
    padding: '0',
    order: '',
    [theme.breakpoints.down('sm')]: {
      width: '80vw',
      order: '-1',
      marginLeft: '15px'
    }
  },
  listItemText: {
    padding: '0 !important'
  },
  navLink: {
    color: 'inherit',
    position: 'relative',
    padding: '0.9375rem',
    fontWeight: 'bold',
    fontSize: '14px',
    textTransform: 'capitalize',
    borderRadius: '3px',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-block',
    '&:strong': {
      fontWeight: 'bold'
    },
    '&:hover,&:focus': {
      color: 'white',
      background: 'rgba(200, 200, 200, 0.2)',
      background: 'linear-gradient(25deg, #ff6600 0%, #ffc526 110%)',
      color: 'inherit',
      textShadow: '0.1em 0.1em 0.1em rgba(0,0,0,.85)'
      // textShadow: '0.05em 0.08em 0.2em rgba(255,255,255,.85)'
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
      // color: '#fff',
      fontFamily: 'Roboto Slab',
      fontWeight: '700',
      transform: 'translate(0,-.07em)',
      '& > span:first-child': {
        justifyContent: 'flex-start'
      },
      '&:hover, &:focus': {
        color: 'inherit',
        textShadow: '0.05em 0.08em 0.2em rgba(255,255,255,.85)'
      }
    }
  },
  searchNavLink: {
    color: 'inherit',
    position: 'relative',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    textTransform: 'capitalize',
    borderRadius: '3px',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-block',
    '&:hover,&:focus': {
      color: 'inherit',
      background: 'rgba(200, 200, 200, 0.2)'
    },
    '& > span:first-child': {
      justifyContent: 'flex-start'
    },
    [theme.breakpoints.down('sm')]: {
      width: 'calc(100% - 30px)',
      marginLeft: '15px',
      marginBottom: '8px',
      marginTop: '8px',
      textAlign: 'left',
      '& > span:first-child': {
        justifyContent: 'flex-start'
      }
    }
  },
  notificationNavLink: {
    color: 'inherit',
    padding: '0.9375rem',
    fontWeight: '400',
    fontSize: '12px',
    // textTransform: 'capitalize',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: 'inline-block',
    top: '4px'
  },
  registerNavLink: {
    top: '3px',
    position: 'relative',
    fontWeight: '400',
    fontSize: '12px',
    // textTransform: 'capitalize',
    lineHeight: '20px',
    textDecoration: 'none',
    margin: '0px',
    display: ''
  },
  navLinkActive: {
    color: 'inherit',
    backgroundColor: 'rgba(255, 255, 255, 0.1)'
  },
  icons: {
    width: '20px',
    height: '20px',
    marginRight: '3px'
  },
  socialIcons: {
    position: 'relative',
    fontSize: '20px !important',
    marginRight: '4px'
  },
  dropdownLink: {
    textDecoration: 'none',
    display: 'block',
    padding: '10px 20px',
    verticalAlign: 'middle',
    color: 'inherit',
    '&:hover, &:focus': {
      color: 'inherit',
      textDecoration: 'none',
      display: 'block',
      padding: '10px 20px',
      textShadow: '0.1em 0.1em 0.1em rgba(0,0,0,.85)'
    }
  },
  ...tooltip,
  marginRight5: {
    marginRight: '5px'
  }
});

export default headerLinksStyle;
