import React,{useState,useEffect} from 'react'
import  cx from 'classnames'
import Drumpads from './Drumpads/Drumpads'
import ArtistsCarousel from './ArtistsCarousel'
// import {Dots} from from 'Patterns'
import {SportifyLogo} from './AnimatedVectors'
import {
  landing,
  isPassive,
  caption,
  captionContent,
  listen,
  description,
  dots,
  login,
  loginContent,
  loginButton,
  explore,
  exploreContent,
  exploreIcons,
  guest,
  exploreAction
} from './Landing.module.sass';




function Landing() {
    const [continerColumns, setcontinerColumns] = useState(0)
    const [totalColumns, totalColumns] = useState(18)

    useEffect(() => {
      first
    
      return () => {
        second
      }
    }, [third])
    

    const totalColumns = Math.max(viewportColumns,minColumns);
    const containerArea = minColumns * (window.innerHeight / rows);
    const maxTranslate = Math.min(0, window.innerWidth - containerArea);
    const sectionStryle = {
        widht : `calc((100vh / ${rows}) * ${totalColumns})`,
        gridTemplateCloumns: `repeat(${totalColumns}, calc(100vh / ${rows}))`
    }
  return (
    <section className={cx(landing,{[isPassive]: !isReady})} style={sectionStyle}>
      <div>
        <Drumpads total={28}/>
        <Dots className={dots} isPassive={!isReady}/>
        <div className={captionContent}>
          <h1>
            <span>Discover how</span>
          </h1>
          <h1>
            <span>you</span><span className={listen}>listen.</span>
          </h1>
          <p className={decription}>
            <span>
              Explore your music taste profile and create awesome playlists
            </span>
          </p>
        </div>
      </div>

      <div className={login}>
        <Drumpads total={4}/>
        <div className={loginContent}>
          <Button className={loginButton} onClick={getAccess}>
            <SpotifyLogo/>Continue with spotify
          </Button>
        </div>
        {artists.length > 0 && (
          <ArtistsCarousel isPassive={!isReady} artists= {artists} playlistImages={playlistImages} playlistTitle ={title} playlistUri={uri}
          />
        )}

        <div className={explore}>
          <Drumpads total={6}/>
          <div className={exploreContent}>
            <div className={exploreIcons}>
              <div><span>
                <InstrumentIcon/></span>
                <span>
                  <BoltIcon/>
                </span>
                </div>
            </div>
            <div className={guest}>
              <span>Dont have a spotify Account?</span>
              <span className={exploreAction}>Explore</span>
            </div>
          </div>
        </div>
      </div>
      <Drumpads total={extraDrumPads}
    </section>
  )
}

export default Landing
