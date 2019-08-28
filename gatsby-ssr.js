/* eslint-disable react/jsx-props-no-spreading */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
import React from 'react';
import Transition from './src/components/Transition/Transition';

export const wrapPageElement = ({ element, props }) => (
  <Transition {...props}>{element}</Transition>
);
