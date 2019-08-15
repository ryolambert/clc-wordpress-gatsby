const mapStyle = theme => ({
  mapContainer: {
    height: '100%',
    minHeight: '30vh',
    maxHeight: '1000px',
    [theme.breakpoints.up('md')]: {}
  },
  fullscreenControl: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: '10px',
    zIndex: '150'
  },
  navControl: {
    position: 'absolute',
    top: 36,
    left: 0,
    padding: '10px',
    zIndex: '150'
  },
  infoPanel: {
    position: 'absolute',
    width: '35%',
    minHeight: '40%',
    maxHeight: '90%',
    background: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
    top: 0,
    right: 0,
    padding: '10px',
    margin: '10px',
    borderRadius: '4px',
    zIndex: '150',
    [theme.breakpoints.down('md')]: {
      width: '40%'
    }
  }
});

export default mapStyle;
