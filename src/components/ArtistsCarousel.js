import React,{useState,useEffect} from 'react'
import cx from 'classnames';
import Drumpads from './Drumpads/Drumpads';
import {
  artistsCarouselContainer,
  isPassiveCarousel,
  carouselEntrance,
  artistCard,
  loadingNextArtist,
  artistCover,
  animateArtistIn,
  artistLink,
  artistTitile,
  artistName,
  artistGenres,
  nextArtistDetails,
  audioToggleBg,
  audioToggle,
  cardGlow,
  cardGlowActive,
  ovalDash,
  explorePlaylist,
  expandable,
  danceIcon,
  playlistCover,
  playlistPlay,
  ArtistFeaturedTrack,
  artistFeaturedAlbumCover,
  nextArtistFeaturedAlbumCover,
  featuredTrackData,
  trackDetails,
  nextArtistTrackDetails,
  featuredTrackNameLabel,
  featuredTrackName,
  artistPopularityContainer,
  artistPopularity,
  loadNextPopularity,
  currentArtistPopularity,
  nextArtistPopularity,
  carouselControl,
  loadNextArtist,
  loadPreviousArtist,
  loadNextTrack,
  carouselChevron,
  passiveChevron,
  controlArtist,
  passiveControl,
  passiveRing,
  carouselArtistImage
} from './Landing.module.sass';
import PlayIcon from '../../vectors/ChevronLeftIcon'

import OvalDash from '../../vectors/OvalDash';
import DanceIcon from '../../vectors/DanceIcon';
import ChevronLeftIcon from '../../vectors/ChevronLeftIcon';
import ChevronRightIcon from '../../vectors/ChevronRightIcon';
import RadialProgress from '../../vectors/RadialProgress';

 function ArtistsCarousel(){

    const [artist, setArtist] = useState(second)
    const [popularityIcon, setPopularityIcon] = useState(null)
    const [nextArtists, setNextArtists] = useState(second)
    const [newArtistKey, setNewArtistKey] = useState(0)
    const [cardKeyNumber, setCardKeyNumber] = useState(0)
    const [popularityKeyNumber, setpopularityKeyNumber] = useState(0)
    const [swipeArtists, setSwipeArtists] = useState([...props.artists])

    const onMouseEnter = ()=>{
      const {activateGlow, audioAutoPreview} = this.props

      const {
        hasEnteredCard,
        canPlayAudio,
        mouseLeavePause,
        hasInitializedPlay
      } = this.state;

      activateGlow(false);
      if(!hasEnteredCard){
        this.setState({
          audioState: 'loading',
          hasEnteredCard: true
        })
      }

      if(canPlayAudio && audioAutoPreiew && (!hasInitializedPlay || mouseLeavePause)){
        this.mousePlayTimeout = setTimeout(()=>{
          const {isPlaying, hasInitializedPlay, mouseLeavePause} = this.state;

          if(!isPlaying && (!hasInitializedPlay || mouseLeavePause)){
            playAudio(this.featuredTrackPreview);
            this.setState({
              isPlaying: true,
              mouseLeavePause: false
            })
          }
          !hasInitializedPlay && this.setState({
            hasInitializedPlay: true
          });
        }, audioFadeDuration);
      }
    }

    const onMouseLeave =()=>{
      clearTimeout(this.mousePlayTimeout);
      const {canPlayAudio,isPlaying} = this.state;

      this.props.activateGlow(true);

      if(canPlayAudio && isPlaying){
        pauseAudio(this.featuredTrackPreview);

        this.setState({
          isPlaying: false,
          audioState: 'paused',
          mouseLeavePause: true
        })
      }

    const onCanPlayAudio = ()=>{
      const {audioAutoPreview} = this.props;
      const {cardActive,hasPlayedThrough} = this.state

      if(hasPlayedThrough){
        return
      }

      const autoPreview = cardActive && audioAutoPreview;

      this.setState(
        {
          canPlayAudio: true,
          audoState: autoPreview ? 'playing' : 'paused'
        },
        ()=>{
          autoPreview && this.togglePlayState();
        }
      )
    }
    }

    const onAudioTimeUpdate =()=>{
      if(this.fearuredTrackPreview.currentTime > 28 && !this.state.closeFading){
        this.setState({closeFading: true});
        fadedOutAudio(this.featuredTrackPreview);
      }
    }
    const onAudioPlay = ()=>{
      this.setState({audioState: 'playing'})
    }

    const onAudioPause = ()=>{
      this.setState({audioState: 'paused'})
    }

    const onAudioEnd = ()=>{
      this.setState({
        isPlaying: false,
        audioState: 'paused',
        hasPlayedThrough: true,
        closeFading: false
      })
    }
    
    const togglePlayState =()=>{
      const {canPlayAudio, isPlaying,hasInitializedPlay} = this.state;

      if(!canPlayAudio){
        return
      }

      isPlaying ? pauseAudio(this.fearuredTrackPreview) : playAudio(this.fearuredTrackPreview)

      !hasInitializedPlay && this.setState({hasInitializedPlay : true})

      this.setState({
        isPlaying: !isPlaying,
        mouseLeavePause: false
      })
    }

    const onCardIterationComplete = (evt,reverseCarousel)=>{
      const {swipeArtists, cardKeyNumber, popularityKeyNumber, nextArtists, newArtistKey} = this.state
      
      clearTimeout(this.setPopularityIconTimeout);
      clearTimeout(this.setAcvtiveArtistTimeout);

      const newNextArtists = [...nextArtists];

      const seletedArtist = reverseCarousel ? swipeArtists[swipeArtists.length - 1] : swipeArtists[1];

      const newArtist = JSON.parse(JSON.stringify(selectedArtist));
      newArtist.key = newArtistKey + 1;
      newNextArtists.push(newArtist);

      if(reverseCarousel){
        const lastArtist = swipeArtists.pop();
        swipeArtists.unshift(lastArtist);
      }else{
        const firstArtist = swipeArtists.shift();
        swipeArtists.push(firstArtist);
      }

      this.setState({reverseCarousel, swipeArtists, nextArtists: newNewxtArtists.slice(Math.max(newNextArtists.length - 10,0)),
        newArtistKey: newArtistKey + 1,
        swipeTriggered: !evt

      });

      this.setPopularityIconTimeout = setTimeout(() => {
        const{icon: popularityIcon} = getPopularityGroup(swipeArtists[0].popularity)
        swipeArtists[0].popularity

        this.setState({
          popularityIcon,
          populairtyKeyNumber: popularityKeyNumber + 1,
          swipeTriggered: false
        });
      }, 700);

      this.setActiveArtistTimeout = setTimeout(() => {
        this.setState({
          artists: [...swipeArtists],
          cardKeyNumber: cardKeyNumber + 1,
          hasEnteredCard: false,
          canPlayAudio: false,
          mouseLeavePause: false,
          hasInitializedPlay: false,
          hasPlayedThrough: false,
          nextArtists: [],
          reverseCarousel: false
        })
      }, 1500);
    }

    setPlaylistOvalActive = playlistOvalActive =>{
      this.setState({
        playlistOvalActive
      })
    }
  

      return (
        <div className={cx(artistsCarouselContainer, {
          [isPassiveCarousel]: isPassive,
          [carouselEntrance]: animateArtist
        })}>
          <Drumpads total= {54}/>
          <div
          key={`artist-card=${cardKayNumber}`} 
          className={cx(artistCard, {
            [loadingNextArtist]: nextArtists.length
          })}
          onMouseEnter={this.onMouseEnter}
          onMouseLeave={this.onMouseLeave}
          >
          <a href={uri} className={artistLink}>
            <SpotifyLogo animateIn={false}/>
          </a>

          <img
            alt={name}
            src={getImageurl(images)}
            className={cx(artistCover,{[animateArtistIn]: animateArtist})}
          />

          <div className={artistTitile}>
              <span className={artistName}>
                <MultiLineEllipsis text={name} lines={2}/>
              </span>
              <span className={artistGenres}>
                {genres.length > 0 && (
                  <>
                  <span>{genres[0]}</span>
                  {genres.length > 1 && (
                  <span>+{genres.length - 1}</span>
                  )}
                  </>
                )}
              </span>
          </div>
            {
              nextArtists.map(({name, images,genres,key})=>(
                <div className={nextArtistDetails} key={key}>
                  <img alt={name} src={getImageUrl(images)} className={artistCover}/>
                  <div className={artistTitile}>
                    <span className={aristName}>
                      <MultiLineEllipsis text={name} lines={2}/>
                    </span>
                    <span className={artistGenres}>
                      {genres.length > 0 && (
                        <>
                        <span>
                          {genres[0]}
                        </span>
                        {genres.length > 1 && <span>+{genres.length - 1}</span>}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              ))
            }
            {!disableToggleAudioBg && <span className={audioToggleBg}/>}
            <span className={audioToggle} onClick={this.togglePlayState}>
              <AudioControl audioState={audioState}/>
            </span>
          </div>

            <audio
            ref={this.fearuredTrackPreviewRef}
            preload='none'
            src={fearuredTrack.preview_url}
            onCanPlay={this.onCanPlayAudio}
            onPlay = {this.onAudioPlay}
            onPause={this.onAudioPause}
            onEnded={this.onAudioEnd}
            onTimeUpdate={this.onAudioTimeUpdate}
            />
            <span className={cx(cardGlow,{[cardGlowActive]: cardActive})}/>
            <div
            onMouseEnter={()=>this.setPlaylistOvalActive(true)}
            onMouseLeave={()=>this.setPlaylistOvalActive(true)}
            className={cx(explorePlaylist, { [expandable]: canExpandPlaylist })}
            >
              <span className={danceIcon}>
                <DanceIcon/>
              </span>
              <div className={playlistCover} style={{backgroundImage: `url(${getImageUrl(playlistImages)})`}}/>
              <p>Picks of the week</p>
              <h3 dangerouslySetInnerHTML={{{ __html: playlistTitle}}}/>
                <a href={playlistUri} className={playlistPlay}>
                  <PlayIcon/>
                </a>
            
            </div>

            <div className={ovalDash}>
              <OvalDash isActive={playlistOvalActive}/>
            </div>

            {/* this is the sectio for the right side of the images */}
            <div className={cx(ArtistFeaturedTrack,{
              [loadNextTrack]: lastNextArtist
            })} key={secondToLastNextArtist ? secondToLastNextArtist.key : 0} className={artistFeaturedAlbumCover}>
              <div>
                <div style={{backgroundImage: `url(${getImageUrl(
                        secondToLastNextArtist
                          ? secondToLastNextArtist.featuredTrack.album.images
                          : featuredTrack.album.images
                      )})`}}></div>
              </div>
            </div>

            {lastNextArtist && (
              <div
              key={lastNextArtist.key}
              className={nextArtistFeaturedAlbumCover}>
                <div 
                style={{
                  backgroundImage: `url(${getImageUrl(
                    lastNextArtist.featuredTrack.album.images
                  )})`
                }}/>
              </div>
            )}

            <div className={featuredTrackData}>
              <div
              key={secondToLastNextArtist ? secondToLastNextArtist.key: 0}
              className={trackDetails}>
                <span className={featuredTrackNameLabel}>
                  Featured Track
                </span>
                <span className={featuredTrackName}>
                  {secondToLastNextArtist ? secondToLastNextArtist.fearuredTrack.name : featuredTrack.name}
                </span>
              </div>
              {lastNextArtist && (
                <div key={lastNextArtist.key} className={nextArtistTrackDetails}>
                  <span className={featuredTrackNameLabel}>Featured Track</span>
                  <span className={featuredTrackName}>{lastNextArtist.featuredTrack.name}</span>
                </div>
              )}
            </div>

            <div className={artistPopularityContainer}>
              <div className={cx(artistPopularity,{
                [loadNextPopularity]: lastNextArtist
              })}>
                <div className={currentArtistPopularity}>
                  <span key={`artist-popularity-icon-${popularityKeyNumber}`}>{popularityIcon}</span>
                  <div
                  key={secondToLastNextArtist ? secondToLastNextArtist.key : `artist-popularity-${cardKeyNumber}`}>
                    <h4>
                      Popularity
                    </h4>
                    <p>
                      {secondToLastNextArtist ? secondNextPopularityLabel : popularityLabel}
                    </p>
                  </div>
                </div>
                {lastNextArtist && (
                  <div key={lastNextArtist.key} className={nextArtistPopularity}>
                    <span/>
                    <div>
                      <h4>Popularity</h4>
                      <p>{nextPopulairyLabel}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div key={secondToLastNextArtist ? secondToLastNextArtist.key : `carousel-control-${cardKeyNumber}`} className={
              cx(carouselControl, {[loadNextArtist]: lastNextArtist && !reverseCarousel, [loadPreviousArtist]: lasNextArtist && reverseCarousel })
            } >
              <span className={cx(carouselChevron, {
                [passiveChevron]: isPassive
              })} onClick={()=>this.onCardIterationComplete(null, true)}>
              <ChevronLeftIcon/>
              </span>
              <div className={controlArtist}>
                <div className={carouselArtistImage} style={{backgroundImage: `url(${getImageUrl(
                  secondToLastNextArtist ? swipeArtists[reverseCarousel? swipeArtists.length -1 : swipeArtists.lengh - 3].images : artists[artists.length - 2].images
                )})`}}/ >
                  <div className={cx(controlArtist, {[passiveControl]: isPassive})} onClick={()=>this.onCardIterationComplete(null,true)}>
                    <div className={carouselArtistImage}
                    style={{
                      backgroudImage: `url(${getImageUrl(
                        secondToLastNextArtist ? swipeArtists[
                          reverseCarousel?0: swipeArtists.length -2].images : artists[artists.length - 1].images
                      )})`
                    }}></div>
                    <div className={cx(controlArtist,{[passiveControl]: isPassive, [passiveRing]: !canAnimateRing})}>
                      <RadialProgress  preventEndEvent={swipeTriggered} onAnimationEnd={this.onCardIterationComplete}/>
                      <div></div>
                    </div>
                  </div>
              
              </div>
              <span className={carouselArtistImage}
              style={{
                backgroundImage: `url(${getImageUrl(
                  secondToLastNextArtist
                    ? swipeArtists[
                        reverseCarousel ? 1 : swipeArtists.length - 1
                      ].images
                    : images
                )})`
              }}
                
              />
            </div>

            <div className={
              cx(controlArtist,{
                [passiveControl]: isPassive
              })
            }
            onClick={()=> this.onCardIterationComplete(null)}>
              <div
              className={carouselArtistImage} style={{
                backgroundImage: `url(${getImageUrl(
                  secondToLastNextArtist ? swipeArtists[reverseCarousel ? 2: 0].images: artists[1].images
                )})`
              }}></div>
              <div className={carouselArtist}>
                <div className={carouselArtistImage} style={{
                  backgroundImage:`url(${getImageUrl(secondToLastNextArtist ? swipeArtists[reverseCarousel ? 3 : 1].images : artists[2].images)})`
                }}></div>
                <span
                className={cx(carouselChevron, {[passiveChevron]: isPassive})} onClick={()=>this.onCardIterationComplete(null)}>
                  <ChevronRightIcon/>
                </span>
              </div>
            </div>
            
        </div>
      )
}


export default ArtistsCarousel