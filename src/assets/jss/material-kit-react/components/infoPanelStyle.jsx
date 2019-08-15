import {
  grayColor,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor
} from 'assets/jss/material-kit-react.jsx';

const infoPanelStyle = theme => ({
  infoPanelContainer: {
    height: 'auto',
    overflow: 'hidden',
    lineHeight: '0.5rem',
    margin: '5px',
    verticalAlign: 'center'
  },
  title: {
    fontFamily: 'Roboto Slab',
    fontSize: '1.25rem',
    lineHeight: '1rem',
    margin: '5px 0px 5px',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
      linHeight: '0.4rem'
    }
  },
  subtitle: {
    fontSize: '1rem',
    fontWeight: '600',
    fontStyle: 'Italic',
    lineHeight: '0.75rem',
    margin: '5px 0px 5px',
    [theme.breakpoints.down('md')]: {
      fontSize: '0.75rem',
      linHeight: '0.75rem'
    }
  },
  directionsLink: {
    color: '#fff',
    textShadow: '0.05em 0.08em 0.2em rgba(0,0,0,.85)',
    border: '0',
    backgroundColor: warningColor,
    transition: 'all .3s',
    padding: '0px 11px',
    marginBottom: '10px',
    minWidth: '80%',
    height: '30px',
    minHeight: 'auto',
    lineHeight: '30px',
    fontWeight: '500',
    fontSize: '14px',
    textTransform: 'uppercase',
    background: 'transparent',
    textDecoration: 'none',
    boxSizing: 'border-box',
    '&:hover,&:focus': {
      zIndex: '3',
      backgroundColor: '#eee',
      borderColor: '#ddd'
    },
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

export default infoPanelStyle;
