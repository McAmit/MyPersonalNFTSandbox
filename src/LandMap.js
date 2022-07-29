import Lands from './Lands.js';
// import React, { Component } from "react";
import { MapInteractionCSS } from 'react-map-interaction';

// This component uses CSS to scale your content.
// Just pass in content as children and it will take care of the rest.

const LandMap = (userName) => {
    const value = {
      scale: 0.2,
      translation: {
        x:0,
        y:0
      }
    }
  return (
    <MapInteractionCSS defaultValue={value} showControls>
        
      <Lands userName={userName}/>
    </MapInteractionCSS>
  );
} 
export default LandMap