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
        console.log('manifest response:', res)
        return Ajax.getImagesBySol(INITIAL_ROVER, res.max_sol)
      })
      .then((res) => {
        console.log('photo response:',res)
        this.setState({
          photos: res.photos
        })
      })
      .catch(err => console.warn(err));
  }

  render() {
    return (
      <div className="App">
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
