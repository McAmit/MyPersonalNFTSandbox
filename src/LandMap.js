import Lands from './Lands.js';
import React, { Component } from "react";
import { MapInteractionCSS } from 'react-map-interaction';

// This component uses CSS to scale your content.
// Just pass in content as children and it will take care of the rest.

const LandMap = () => {
    
  return (
    <MapInteractionCSS className="zoom">
        
      <Lands/>
    </MapInteractionCSS>
  );
} 
export default LandMap