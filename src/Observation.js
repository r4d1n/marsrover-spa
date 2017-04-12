import React, { Component } from 'react';

class Observation extends Component {
  render() {
    return (
      <div className="item-wrapper" data-id="{id}">
        <div className="img-container">
          <img src={this.props.img_src} alt={`${this.props.rover}-${this.props.camera}-${this.props.earth_date}`} className="photo"></img>
        </div>
        <div className="metadata">
          <ul>
            <li>image id: {this.props.id}</li>
            <li>martian sol: {this.props.sol}</li>
            <li>earth date: {this.props.earth_date}</li>
            <li>rover: {this.props.rover}</li>
            <li>camera: {this.props.camera}</li>
          </ul>
        </div>
        <div className="btn-container">
          <ul></ul>
        </div>
      </div>
    )
  }
}

export default Observation;
