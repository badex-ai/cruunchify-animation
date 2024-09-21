import React from 'react'
import Drumpad from './Drumpad';

function Drumpads({total}) {
  const drumPads = Array(total).fill();
  return (
    <>
           {drumPads.map((item, index) => (
        <DrumPad key={index} />
      ))
      }
    </>
  )
}

export default Drumpads