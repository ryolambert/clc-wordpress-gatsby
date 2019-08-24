/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import 'typeface-roboto';
import 'typeface-roboto-slab';
import React from 'react';
import Transition from './src/components/Transitions/Transition.jsx';

export const wrapPageElement = ({ element, props }) => (
  <Transition {...props}>{element}</Transition>
);
