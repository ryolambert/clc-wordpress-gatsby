import { container, title } from 'assets/jss/material-kit-react.jsx';

import imagesStyle from 'assets/jss/material-kit-react/imagesStyles.jsx';
import { cardTitle } from 'assets/jss/material-kit-react.jsx';

const postsIndexPageStyle = {
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
  main: {
    background: '#FFFFFF',
    position: 'relative'
  },
  mainRaised: {
    margin: '-60px 30px 0px',
    borderRadius: '6px',
    boxShadow:
      '0 16px 24px 2px rgba(0, 0, 0, 0.14), 0 6px 30px 5px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)'
  },
  title: {
    ...title,
    display: 'inline-block',
    position: 'relative',
    marginTop: '30px',
    minHeight: '32px',
    textDecoration: 'none'
  },
  socials: {
    marginTop: '0',
    width: '100%',
    transform: 'none',
    left: '0',
    top: '0',
    height: '100%',
    lineHeight: '41px',
    fontSize: '20px',
    color: '#999'
  },
  navWrapper: {
    margin: '20px auto 50px auto',
    textAlign: 'center'
  },
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
};

export default postsIndexPageStyle;
