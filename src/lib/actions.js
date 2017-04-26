import network from './network';

export const REQUEST_MANIFEST = 'REQUEST_MANIFEST';
export const RECEIVE_MANIFEST = 'RECEIVE_MANIFEST';
export const REQUEST_SOL = 'REQUEST_SOL';
export const RECEIVE_SOL = 'RECEIVE_SOL';
export const SELECT_ROVER = 'SELECT_ROVER';
export const SELECT_SOL = 'SELECT_SOL';

export function selectRover(rover) {
  return {
    type: SELECT_ROVER,
    rover
  }
}

export function selectSol(sol) {
  return {
    type: SELECT_SOL,
    sol
  }
}

function requestManifest(rover) {
  return {
    type: REQUEST_MANIFEST,
    rover
  }
}

function receiveManifest(json) {
  let availableSols = json.photos.map((el) => el.sol).reverse()
  if (availableSols.indexOf(json.max_sol) < 0) availableSols.unshift(json.max_sol) // sometimes the API data is inconsistent about this
  return {
    type: RECEIVE_MANIFEST,
    availableSols,
    selectedSol: availableSols[0],
    receivedAt: Date.now()
  }
}

function requestSol(sol) {
  return (dispatch, getState) => {
    let rover = getState().selectedRover;
    dispatch({
      type: REQUEST_SOL,
      sol,
      rover
    });
  }
}

function receiveSol(json) {
  return (dispatch, getState) => {
    let rover = getState().selectedRover;
    dispatch({
      type: RECEIVE_SOL,
      receivedAt: Date.now(),
      rover
    });
  }
}

function shouldFetchManifest(state, rover) {
  const roverState = state.solsByRover[rover];
  if (!roverState) {
    return true
  } else {
    return false
  }
}

export function fetchManifest(rover) {
  return function (dispatch, getState) {
    if (shouldFetchManifest(getState(), rover)) {
      dispatch(requestManifest(rover));
      return network.getManifest(rover).then(json => dispatch(receiveManifest(json)));
    } else {
      return Promise.resolve()
    }
  }
}


function shouldfetchSol(state, rover) {
  const roverState = state.solsByRover[rover];
  if (!roverState) {
    return true
  } else {
    return false
  }
}

export function fetchSol(sol) {
  return function (dispatch, getState) {
    if (shouldfetchSol(getState(), sol)) {
      dispatch(requestSol(sol));
      return network.getImagesBySol(getState().selectedRover, sol).then(json => dispatch(receiveSol(json)));
    } else {
      return Promise.resolve()
    }
  }
}


