import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import cx from 'classnames';

import { vectorWrapper, trending } from './AnimatedVectors.module.sass';
import data from './data/trending.json';

class Trending extends Component {
  containerRef = createRef();

  componentDidMount() {
    this.animation = lottie.loadAnimation({
      container: this.containerRef.current,
      renderer: 'svg',
      autoplay: true,
      loop: true,
      animationData: data
    });

    this.animation.onComplete = this.starLoop;
  }

  componentWillUnmount() {
    this.animation.destroy();
  }

  render() {
    return (
      <span className={cx(vectorWrapper, trending)} ref={this.containerRef} />
    );
  }
}

export default Trending;
