import React, { Component, createRef } from 'react';
import lottie from 'lottie-web';
import PropTypes from 'prop-types';

import { vectorWrapper } from './AnimatedVectors.module.sass';
import data from './data/audioControl.json';

class AudioControl extends Component {
  state = {};
  containerRef = createRef();

  onAudioStateChange(audioState, prevAudioState) {
    const { hasLoaded } = this.state;

    if (audioState === 'loading') {
      this.setState({ hasLoaded: true });
      this.animation.loop = true;
      this.animation.playSegments([0, 80], true);
      this.animation.playSegments([60, 80]);
    }

    if (audioState === 'paused' && prevAudioState === 'loading') {
      this.animation.loop = false;
      this.animation.playSegments([80, 0]);
    }

    if (audioState === 'playing' && prevAudioState === 'loading') {
      this.animation.playSegments([80, 160]);
      this.animation.playSegments([120, 160]);
      this.animation.loop = true;
    }

    if (audioState === 'playing' && prevAudioState === 'paused') {
      if (!hasLoaded) {
        this.animation.goToAndStop(190, true);
        this.setState({ hasLoaded: true });
      }
      this.animation.playSegments([190, 120]);
      this.animation.playSegments([120, 160]);
      this.animation.loop = true;
    }

    if (audioState === 'paused' && prevAudioState === 'playing') {
      this.animation.playSegments([160, 190]);
      this.animation.loop = false;
    }
  }

  componentDidUpdate(prevProps) {
    const { audioState } = this.props;

    if (audioState !== prevProps.audioState) {
      this.onAudioStateChange(audioState, prevProps.audioState);
    }
  }

  componentDidMount() {
    this.animation = lottie.loadAnimation({
      container: this.containerRef.current,
      renderer: 'svg',
      autoplay: false,
      animationData: data
    });
  }

  componentWillUnmount() {
    this.animation.destroy();
  }

  render() {
    return <span className={vectorWrapper} ref={this.containerRef} />;
  }
}

AudioControl.propTypes = {
  audioState: PropTypes.oneOf(['loading', 'playing', 'paused'])
};

export default AudioControl;
