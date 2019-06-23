import {
  container,
  defaultFont,
  primaryColor,
  infoColor,
  successColor,
  warningColor,
  dangerColor,
  roseColor,
  transition,
  boxShadow,
  drawerWidth,
  warningBoxShadow
} from 'assets/jss/material-kit-react.jsx';

const headerStyle = {
  appBar: {
    display: 'flex',
    border: '0',
    borderRadius: '3px',
    padding: '0.25rem 0',
    marginBottom: '20px',
    color: '#555',
    width: '100%',
    backgroundColor: '#fff',
    boxShadow:
      '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    transition: 'all 150ms ease 0s',
    alignItems: 'center',
    flexFlow: 'row nowrap',
    justifyContent: 'flex-start',
    position: 'fixed',
    zIndex: 'unset'
  },
  absolute: {
    position: 'absolute',
    zIndex: '10000'
  },
  fixed: {
    position: 'fixed',
    zIndex: '10000'
  },
  container: {
    ...container,
    minHeight: '5vh',
    flex: '1',
    alignItems: 'center',
    justifyContent: 'space-between',
    display: 'flex',
    flexWrap: 'nowrap'
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: '30px',
    fontSize: '18px',
    borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    padding: '8px 16px',
    fontFamily: 'Roboto Slab',
    fontWeight: '400',
    '&:hover,&:focus': {
      color: 'inherit',
      background: 'transparent'
    }
  },
  brandTitle: {
    ...defaultFont,
    // lineHeight: '30px',
    fontSize: '18px',
    // borderRadius: '3px',
    textTransform: 'none',
    color: 'inherit',
    // padding: '8px 16px',
    // margin: '10px 10px'
    fontFamily: 'Roboto Slab',
    fontWeight: '400',
    justifyContent: 'center',
    marginBottom: '10px',
    textShadow: '0 0 .5em rgba(255,255,255,.4)',
    animation: 'floatingText 2s ease alternate infinite',
    '&:hover,&:focus': {
      color: 'inherit',
      background: 'transparent'
    }
  },
  appResponsive: {
    margin: '20px 10px'
  },
  primary: {
    backgroundColor: primaryColor,
    color: '#FFFFFF',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)'
  },
  info: {
    backgroundColor: infoColor,
    color: '#FFFFFF',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)'
  },
  success: {
    backgroundColor: successColor,
    color: '#FFFFFF',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)'
  },
  warning: {
    backgroundColor: warningColor,
    color: '#FFFFFF',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)'
  },
  danger: {
    backgroundColor: dangerColor,
    color: '#FFFFFF',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)'
  },
  rose: {
    backgroundColor: roseColor,
    color: '#FFFFFF',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)'
  },
  transparent: {
    backgroundColor: 'transparent !important',
    boxShadow: 'none',
    // paddingTop: '25px',
    color: '#FFFFFF'
  },
  dark: {
    color: '#FFFFFF',
    backgroundColor: '#212121 !important',
    boxShadow:
      '0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)'
  },
  white: {
    border: '0',
    padding: '0.625rem 0',
    marginBottom: '20px',
    color: '#555',
    backgroundColor: '#fff !important',
    boxShadow:
      '0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)',
    position: 'sticky'
  },
  drawerPaper: {
    border: 'none',
    bottom: '0',
    borderBottom: '200px',
    borderLeft: '15px',
    borderRight: '75px',
    // borderRadius: '21px 0px 0px 21px/300px 0px 0px 300px',
    // clipPath: 'polygon(20% 10%, 100% 0%, 100% 90%, 20% 100%);',
    // borderRadius: '20px 0px 0px 20px',
    // background: 'linear-gradient(to right, #fd9551 10%,#feb970 100%)',
    // opacity: '0.95',
    boxShadow: '-5px 3px 20px -4px rgba(89,89,89,0.69)',
    transitionProperty: 'top, bottom, width',
    transitionDuration: '.2s, .2s, .35s',
    transitionTimingFunction: 'linear, linear, ease',
    width: drawerWidth,
    ...boxShadow,
    position: 'fixed',
    display: 'block',
    top: '0',
    height: '100vh',
    right: '0',
    left: 'auto',
    visibility: 'visible',
    overflowY: 'visible',
    borderTop: 'none',
    textAlign: 'left',
    paddingRight: '0px',
    paddingLeft: '0',
    ...transition
  },
  warningBoxShadow
};

export default headerStyle;
