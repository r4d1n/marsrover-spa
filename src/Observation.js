import React from 'react';
import './Observation.css'

function Observation(props) {
  return (
    <div className="Observation" data-id="{id}">
      <div className="img-container">
        <img src={props.img} alt={`${props.rover}-${props.camera}-${props.earthDate}`} className="photo"></img>
      </div>
      <div className="metadata">
        <ul>
          <li>image id: {props.id}</li>
          <li>martian sol: {props.sol}</li>
          <li>earth date: {props.earthDate}</li>
          <li>rover: {props.rover}</li>
          <li>camera: {props.camera}</li>
        </ul>
      </div>
    </div>
  )
}

export default Observation;
