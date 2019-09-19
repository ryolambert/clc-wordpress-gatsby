/* eslint-disable react/jsx-props-no-spreading */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it
// import React from 'react';
// import Transition from './src/components/Transition/Transition';

// export const wrapPageElement = ({ element, location, props }) => (
//   <Transition location={location} {...props}>
//     {element}
//   </Transition>
// );

// const transitionDelay = 500;

// exports.shouldUpdateScroll = ({
//   routerProps: { location },
//   getSavedScrollPosition,
// }) => {
//   if (location.action === 'PUSH') {
//     window.setTimeout(() => window.scrollTo(0, 0), transitionDelay);
//   } else {
//     const savedPosition = getSavedScrollPosition(location);
//     window.setTimeout(
//       () => window.scrollTo(...(savedPosition || [0, 0])),
//       transitionDelay
//     );
//   }
//   return false;
// };
