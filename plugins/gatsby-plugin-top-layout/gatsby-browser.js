/* eslint-disable import/prefer-default-export, react/prop-types */
import React from 'react';
import TopLayout from './TopLayout';
import Transition from '../../src/components/Transitions/Transition.jsx';

export const wrapRootElement = ({ element }) => (
  <TopLayout>{element}</TopLayout>
);
