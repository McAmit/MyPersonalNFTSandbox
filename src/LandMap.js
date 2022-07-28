import Lands from './Lands.js';
import React, { Component } from "react";
import { MapInteractionCSS } from 'react-map-interaction';

// This component uses CSS to scale your content.
// Just pass in content as children and it will take care of the rest.

const LandMap = () => {
    const value = {
      scale: 0.2,
      translation: {
        x:0,
        y:0
      }
    }
  return (
    <MapInteractionCSS defaultValue={value} showControls>
        
      <Lands/>
    </MapInteractionCSS>
  );
} 
export default LandMap