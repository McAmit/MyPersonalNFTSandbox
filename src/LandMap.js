import Lands from './Lands.js';
// import React, { Component } from "react";
import { MapInteractionCSS } from 'react-map-interaction';

// This component uses CSS to scale your content.
// Just pass in content as children and it will take care of the rest.

const LandMap = (userName) => {
    const value = {
      scale:0.1,
      translation:{
        x:0,
        y:0
      }
    }
    const bounds = {
      xMin:0,
      xMax:0,
      yMin:0,
      yMax:0
    }
  return (
    <MapInteractionCSS defaultValue={value} showControls disablePan translationBounds={bounds} minScale={0.1} maxScale={0.15}>
        
      <Lands userName={userName}/>
    </MapInteractionCSS>
  );
} 
export default LandMap