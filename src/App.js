import React, { Component } from 'react';
import './App.css';
import Ajax from './Ajax.js';
import Observation from './Observation.js';
import Control from './Control.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSol: 0,
      rover: this.props.rovers[0],
      availableSols: [],
      photos: []
    }
    Ajax.getManifest(this.state.rover)
      .then((res) => {
        console.log('manifest response:', res)
        let availableSols = res.photos.map((el) => el.sol).reverse()
        if (availableSols.indexOf(res.max_sol) < 0) availableSols.unshift(res.max_sol) // sometimes the API data is inconsistent about this
        this.setState({
          availableSols: availableSols,
          currentSol: availableSols[0]
        })
        return Ajax.getImagesBySol(this.state.rover, res.max_sol)
      })
      .then((res) => {
        console.log('photo response:', res)
        this.setState({
          photos: res.photos
        })
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <div className="App">
        <Control
          currentSol={this.state.currentSol}
          solList={this.state.availableSols}
          currentRover={this.state.rover}
          roverList={this.props.rovers}
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
