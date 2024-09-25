import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import cx from 'classnames';

import { vectorWrapper, popularity } from './AnimatedVectors.module.sass';
import data from './data/star.json';

class WellKnown extends Component {
  containerRef = createRef();

  starLoop = () => {
    setTimeout(() => {
      this.animation.playSegments([60, 120]);
    }, 3000);
  };

  componentDidMount() {
    this.animation = lottie.loadAnimation({
      container: this.containerRef.current,
      renderer: 'svg',
      autoplay: true,
      animationData: data
    });

    this.animation.onComplete = this.starLoop;
  }

  componentWillUnmount() {
    this.animation.destroy();
  }

  render() {
    return (
      <span className={cx(vectorWrapper, popularity)} ref={this.containerRef} />
    );
  }
}

export default WellKnown;
