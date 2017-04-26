import { combineReducers } from 'redux';

import {
  REQUEST_MANIFEST, RECEIVE_MANIFEST,
  REQUEST_IMG_DATA, RECEIVE_IMG_DATA,
  SELECT_ROVER, SELECT_SOL
} from './actions';


const selectedRover = (state = 'curiosity', action) => {
  switch (action.type) {
    case SELECT_ROVER:
      return action.rover
    default:
      return state
  }
}

const sols = (state = {
  isFetching: false,
  available: [],
  selected: 0
}, action) => {
  switch (action.type) {
    case REQUEST_MANIFEST:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_MANIFEST:
      return {
        ...state,
        isFetching: false,
        available: action.availableSols,
        sol: action.selectedSol,
        lastUpdate: action.receivedAt
      }
    case REQUEST_IMG_DATA:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_IMG_DATA:
      return {
        ...state,
        isFetching: false,
      }
    case SELECT_SOL:
      return {
        ...state,
        selected: action.sol
      }
    default:
      return state
  }
}

function solsByRover(state = {}, action) {
  switch (action.type) {
    case RECEIVE_IMG_DATA:
    case REQUEST_IMG_DATA:
      return Object.assign({}, state, {
        [action.rover]: sols(state[action.rover], action)
      })
    default:
      return state
  }
}


const rootReducer = combineReducers({
  selectedRover,
  solsByRover
})

export default rootReducer;
