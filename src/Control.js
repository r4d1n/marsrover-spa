import React, { Component } from 'react';
import './Control.css'

const ROVER_NAMES = ['curiosity', 'spirit', 'opportunity']

class Control extends Component {

  constructor(props) {
    super(props);
    this.onRoverChange = this.onRoverChange.bind(this);
    this.onSolChange = this.onSolChange.bind(this);
  }

  onSolChange(e) {
    this.props.updateSol(e.target.value);
  }

  onRoverChange(e) {
    this.props.updateRover(e.target.value);
  }

  render() {
    const currentRover = this.props.selectedRover;
    const currentSol = this.props.selectedSol;
    return (
      <div className="Control">
        <form>
          <span>
            <label name="rover-select" htmlFor="rover-select">rover:</label>
            <select value={currentRover} onChange={this.onRoverChange}>
              {ROVER_NAMES.map((rover) => <option key={rover}>{rover}</option>)}
            </select>
          </span>
          <span>
            <label htmlFor="sol-select">sol:</label>
            <select name="sol-select" value={currentSol} onChange={this.onSolChange}>
              {this.props.availableSols.map((sol) => <option key={sol}>{sol}</option>)}
            </select>
          </span>
        </form>
      </div>
    )
  }
}

export default Control;
