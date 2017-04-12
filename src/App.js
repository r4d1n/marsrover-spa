import React, { Component } from 'react';
import './App.css';
import Ajax from './Ajax.js';
import Observation from './Observation.js';

const INITIAL_ROVER = 'curiosity';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      photos: []
    }
    Ajax.getManifest(INITIAL_ROVER)
      .then((res) => {
        console.log(res)
        return Ajax.getImagesBySol(INITIAL_ROVER, res.max_sol)
      })
      .then((res) => {
        console.log(res)
        this.setState({
          photos: res.photos
        })
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <div className="App">
        {this.state.photos.map(function (el) {
          return (
            <Observation
              key={el.id}
              id={el.id}
              sol={el.sol}
              rover={el.sol}
              camera={el.camera}
            />
          );
        }, this)}
      </div>
    );
  }
}

export default App;
