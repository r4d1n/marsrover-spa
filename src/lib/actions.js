import network from './network';

export const REQUEST_MANIFEST = 'REQUEST_MANIFEST';
export const RECEIVE_MANIFEST = 'RECEIVE_MANIFEST';
export const REQUEST_SOL = 'REQUEST_SOL';
export const RECEIVE_SOL = 'RECEIVE_SOL';
export const SELECT_ROVER = 'SELECT_ROVER';
export const SELECT_SOL = 'SELECT_SOL';

function updateRover(rover) {
  return function (dispatch, getState) {
    if (shouldFetchManifest(getState(), rover)) {
      dispatch(requestManifest(rover));
      return network.getManifest(rover)
        .then(json => dispatch(receiveManifest(json)))
        .then(() => dispatch(requestSol(getState().selected.sol)));
    } else {
      return Promise.resolve();
    }
  }
}


export function selectRover(rover) {
  return function (dispatch, getState) {
    dispatch(updateRover(rover));
    return {
      type: SELECT_ROVER,
      rover
    }
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
  if (!json) return
  let rover = json.name.toLowerCase();
  let availableSols = json.photos.map((el) => el.sol).reverse()
  if (availableSols.indexOf(json.max_sol) < 0) availableSols.unshift(json.max_sol) // sometimes the API data is inconsistent about this
  return {
    type: RECEIVE_MANIFEST,
    rover,
    availableSols,
    receivedAt: Date.now()
  }
}

function requestSol(sol) {
  return (dispatch, getState) => {
    let rover = getState().selected.rover;
    dispatch({
      type: REQUEST_SOL,
      sol,
      rover
    });
  }
}

function receiveSol(sol, json) {
  if (!json) throw new Error(`error receiving sol, data is ${json}`);
  return (dispatch, getState) => {
    let rover = getState().selected.rover;
    dispatch({
      type: RECEIVE_SOL,
      receivedAt: Date.now(),
      photos: json.photos,
      rover,
      sol
    });
  }
}

function shouldFetchManifest(state, rover) {
  const roverState = state.data[rover];
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


function shouldfetchSol(state, rover, sol) {
  const solState = state.data[rover][sol];
  if (!solState) {
    return true
  } else {
    return false
  }
}

export function fetchSol(rover, sol) {
  return function (dispatch, getState) {
    if (shouldfetchSol(getState(), rover, sol)) {
      dispatch(requestSol(sol));
      return network.getImagesBySol(rover, sol).then(json => dispatch(receiveSol(sol, json)));
    } else {
      return Promise.resolve();
    }
  }
}


