import React, { Component } from 'react';

class Control extends Component {
  render() {
    return (
      <div className="Control">
        <form>
          <ul>
            {/*<li>image id: {this.props.currentImageid}</li>*/}
            <li>martian sol:
              <select value={this.props.currentSol}>
                {this.props.solList.map((sol) => <option key={sol}>{sol}</option>)}
              </select>
            </li>
            {/*<li>earth date: {this.props.earthDate}</li>*/}
            <li>rover:
               <select value={this.props.currentRover}>
                {this.props.roverList.map((rover) => <option key={rover}>{rover}</option>)}
              </select>
            </li>
            <li>camera: {this.props.camera}</li>
          </ul>
        </form>
      </div>
    )
  }
}

export default Control;
