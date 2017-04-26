import './App.css';
import React, { Component } from 'react';

import Observation from './Observation.js';
import Control from './Control.js';

import { selectRover, selectSol, fetchManifest, fetchSol } from './lib/actions';

class App extends Component {
  componentDidMount() {
    const { dispatch, selectedRover, selectedSol } = this.props;
    dispatch(fetchManifest(selectedRover))
      .then(() => dispatch(fetchSol(selectedRover, selectedSol)));
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
          selectedSol={this.props.selectedSol}
          solList={this.props.availableSols}
          selectedRover={this.props.selectedRover}
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
