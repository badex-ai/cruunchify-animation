import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';
import cx from 'classnames';

import {
  vectorWrapper,
  spotify,
  noPointer
} from './AnimatedVectors.module.sass';
import data from './data/spotify.json';

class SpotifyLogo extends Component {
  containerRef = createRef();

  playHoverLoop = () => {
    this.animation.loop = true;
    this.animation.playSegments([60, 110]);
  };

  stopHoverLoop = () => {
    this.animation.loop = false;
  };

  componentDidUpdate(prevProps) {
    const { playHoverLoop } = this.props;

    if (playHoverLoop !== prevProps.prevProps) {
      playHoverLoop ? this.playHoverLoop() : this.stopHoverLoop();
    }
  }

  componentDidMount() {
    const { animateIn } = this.props;

    this.animation = lottie.loadAnimation({
      container: this.containerRef.current,
      renderer: 'svg',
      autoplay: animateIn,
      animationData: data
    });

    !animateIn && this.animation.goToAndStop(110, true);
  }

  componentWillUnmount() {
    this.animation.destroy();
  }

  render() {
    const disablePointer = typeof this.props.playHoverLoop === 'boolean';

    return (
      <span
        onMouseEnter={this.playHoverLoop}
        onMouseLeave={this.stopHoverLoop}
        className={cx(vectorWrapper, spotify, { [noPointer]: disablePointer })}
        ref={this.containerRef}
      />
    );
  }
}

SpotifyLogo.defaultProps = {
  animateIn: true
};

SpotifyLogo.propTypes = {
  playHoverLoop: PropTypes.bool,
  animateIn: PropTypes.bool
};

export default SpotifyLogo;
