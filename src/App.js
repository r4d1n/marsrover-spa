import './App.css';
import React, { Component } from 'react';

import Observation from './Observation.js';
import Control from './Control.js';

import { selectRover, selectSol, fetchManifest } from './lib/actions';

class App extends Component {
   componentDidMount() {
    const { dispatch, selectedRover } = this.props;
    dispatch(fetchManifest(selectedRover));
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedRover !== this.props.selectedRover) {
      const { dispatch, selectedRover } = nextProps;
      dispatch(fetchManifest(selectedRover));
    }
  }

  updateRover(rover) {
    this.props.dispatch(selectRover(rover))
  }

  updateSol(sol) {
    this.props.dispatch(selectSol(sol))
  }

  render() {
    return (
      <div className="App">
        <div className="loading-screen" />
        <Control
          currentSol={this.state.currentSol}
          solList={this.state.availableSols}
          currentRover={this.state.currentRover}
          roverList={this.props.roverNames}
          updateRover={this.updateRover}
          updateSol={this.updateSol}
        />
        {this.state.photos.map((el) => {
          return (
            <Observation
              key={el.id}
              id={el.id}
              img={el.img_src}
              sol={el.sol}
              rover={el.rover.name}
              camera={el.camera.name}
              earthDate={el.earth_date}
            />
          );
        }, this)}
      </div>
    );
  }
}

export default App;
