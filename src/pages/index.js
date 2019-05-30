import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, Link } from '@reach/router';

// import 'assets/scss/material-kit-react.scss?v=1.4.0';
// import 'typeface-roboto';
// import 'typeface-roboto-slab';

// pages for this product
import Components from './Components/Components.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';


let hist = createMemoryHistory();

export default () => (
  // <Router history={hist}>
  //   <Switch>
  //     <Route path="/component-page" component={Components} />
  //     <Route path="/profile-page" component={ProfilePage} />
  //     <Route path="/login-page" component={LoginPage} />
  //     <Route path="/" component={LandingPage} />
  //   </Switch>
  // </Router>
  <Router>
    <LandingPage path="/" />
    <Components path="/component-page" />
  </Router>
);
// import React from 'react';
// import LandingPage from './LandingPage/LandingPage';

// import "assets/scss/material-kit-react.scss?v=1.4.0";
// import 'typeface-roboto';
// import 'typeface-roboto-slab';

// export default () => <LandingPage />;
