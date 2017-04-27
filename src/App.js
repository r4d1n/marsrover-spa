import './App.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Control from './Control.js';
import ObservationList from './ObservationList.js';

import { selectRover, selectSol, fetchManifest, fetchSol } from './lib/actions';

const availableRovers = ['curiosity', 'spirit', 'opportunity'];

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

  updateRover = rover => {
    this.props.dispatch(selectRover(rover))
  }

  updateSol = sol => {
    this.props.dispatch(selectSol(sol))
  }

  render() {
    return (
      <div className="App">
        <Control
          currentSol={this.props.selectedSol}
          availableSols={this.props.availableSols}
          currentRover={this.props.selectedRover}
          availableRovers={this.props.availableRovers}
          updateRover={this.updateRover}
          updateSol={this.updateSol}
        />
        <ObservationList photos={this.props.photos} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  let selectedRover = state.selected.rover;
  let selectedSol = state.selected.sol;
  const {
    availableSols,
    photosBySol,
    isFetching,
    lastUpdated
  } = state.data[selectedRover] || {
   availableSols: [],
   photosBySol: {},
   isFetching: false
  };
  const photos = photosBySol[selectedSol] || [];
  return {
    selectedRover,
    selectedSol,
    availableSols,
    availableRovers,
    photos,
    isFetching,
    lastUpdated
  };
}

export default connect(mapStateToProps)(App);
