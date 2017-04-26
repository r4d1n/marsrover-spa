import network from './network';

export const REQUEST_MANIFEST = 'REQUEST_MANIFEST';
export const RECEIVE_MANIFEST = 'RECEIVE_MANIFEST';
export const REQUEST_IMG_DATA = 'REQUEST_IMG_DATA';
export const RECEIVE_IMG_DATA = 'RECEIVE_IMG_DATA';
export const SELECT_ROVER = 'SELECT_ROVER';
export const SELECT_SOL = 'SELECT_SOL';

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

function shouldFetchManifest(state, rover) {
  const roverState = state.solsByRover[rover];
  debugger
  if (!roverState) {
    return true
  } else {
    return false
  }
}

