import React, { Component } from 'react';
import './App.css';
import Ajax from './Ajax.js';
import Observation from './Observation.js';
import Control from './Control.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateRover = this.updateRover.bind(this);
    this.updateSol = this.updateSol.bind(this);
    this.state = {
      currentSol: 0,
      currentRover: this.props.roverNames[0],
      availableSols: [],
      photos: []
    }
    this.updateRover(this.state.currentRover);
  }

  updateRover(rover) {
    if (this.state.currentRover !== rover) {
      this.setState({ currentRover: rover })
    }
    Ajax.getManifest(rover)
      .then((res) => {
        let availableSols = res.photos.map((el) => el.sol).reverse()
        if (availableSols.indexOf(res.max_sol) < 0) availableSols.unshift(res.max_sol) // sometimes the API data is inconsistent about this
        this.setState({
          availableSols: availableSols,
          currentSol: availableSols[0]
        })
        return Ajax.getImagesBySol(rover, res.max_sol)
      })
      .then((res) => {
        this.setState({
          photos: res.photos
        })
      })
      .catch(err => console.warn(err));
  }

  updateSol(sol) {
    this.setState({ currentSol: sol })
    Ajax.getImagesBySol(this.state.currentRover, sol)
      .then((res) => {
        this.setState({
          photos: res.photos
        })
      })
      .catch(err => console.warn(err))

  }

  render() {
    return (
      <div className="App">
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
