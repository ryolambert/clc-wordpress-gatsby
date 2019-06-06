/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import TopLayout from './TopLayout';

export const wrapRootElement = ({ element }) => {
  return <TopLayout>{element}</TopLayout>;
};


// const transitionDelay = 500;
// exports.shouldUpdateScroll = ({
//   routerProps: {
//     location
//   },
//   getSavedScrollPosition
// }) => {
//   if (location.action === 'PUSH') {
//     window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
//   } else {
//     const savedPosition = getSavedScrollPosition(location);
//     window.setTimeout(() => window.scrollTo(...(savedPosition || [0, 0])), transitionDelay);
//   }

//   return false;
// };