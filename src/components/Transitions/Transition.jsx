import React from 'react';
import posed, { PoseGroup } from 'react-pose';

const timeout = 0;

class Transition extends React.PureComponent {
  render() {
    const { children, location } = this.props;

    const RoutesContainer = posed.div({
      enter: {
        opacity: 1,
        filter: 'blur(0px)',
        x: 0,
        delay: 100,
        delayChildren: 200
      },
      exit: {
        opacity: 0,
        filter: 'blur(20px)',
        x: 10
      }
    });

    return (
      <PoseGroup>
        <RoutesContainer key={location.pathname}>{children}</RoutesContainer>
      </PoseGroup>
    );
  }
}

export default Transition;
