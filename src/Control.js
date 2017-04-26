import React from 'react';
import './Control.css';

function Control(props) {
  const {
    currentRover,
    currentSol,
    updateRover,
    updateSol,
    availableRovers,
    availableSols
  } = props;

  return (
    <div className="Control">
      <form>
        <span>
          <label name="rover-select" htmlFor="rover-select">rover:</label>
          <select value={currentRover} onChange={e => updateRover(e.target.value)}>
            {availableRovers.map((rover) => <option key={rover}>{rover}</option>)}
          </select>
        </span>
        <span>
          <label htmlFor="sol-select">sol:</label>
          <select name="sol-select" value={currentSol} onChange={e => updateSol(e.target.value)}>
            {availableSols.map((sol) => <option key={sol}>{sol}</option>)}
          </select>
        </span>
      </form>
    </div>
  )
}

export default Control;
