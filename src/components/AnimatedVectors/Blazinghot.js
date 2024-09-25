import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import cx from 'classnames';

import { vectorWrapper, popularity } from './AnimatedVectors.module.sass';
import data from './data/fire.json';

class BlazingHot extends Component {
  containerRef = createRef();

  componentDidMount() {
    this.animation = lottie.loadAnimation({
      container: this.containerRef.current,
      renderer: 'svg',
      autoplay: true,
      loop: true,
      animationData: data
    });

    this.animation.playSegments([38, 152]);
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

export default BlazingHot;
