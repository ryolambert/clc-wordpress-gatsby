import React from 'react';
import { createMemoryHistory } from 'history';
import { Router, Link } from '@reach/router';
import Components from './Components/Components.jsx';
import LandingPage from './LandingPage/LandingPage.jsx';

const hist = createMemoryHistory();

export default () => (
  <Router>
    <LandingPage path="/" />
    <Components path="/component-page" />
  </Router>
);
