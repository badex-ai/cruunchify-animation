import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import cx from 'classnames';

import { vectorWrapper, underground } from './AnimatedVectors.module.sass';
import data from './data/ghost.json';

class Underground extends Component {
  containerRef = createRef();

  componentDidMount() {
    this.animation = lottie.loadAnimation({
      container: this.containerRef.current,
      renderer: 'svg',
      autoplay: true,
      loop: true,
      animationData: data
    });
  }

  componentWillUnmount() {
    this.animation.destroy();
  }

  render() {
    return (
      <span
        className={cx(vectorWrapper, underground)}
        ref={this.containerRef}
      />
    );
  }
}

export default Underground;
