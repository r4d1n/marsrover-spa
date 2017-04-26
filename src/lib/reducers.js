import { combineReducers } from 'redux';

import {
  REQUEST_MANIFEST, RECEIVE_MANIFEST,
  REQUEST_SOL, RECEIVE_SOL,
  SELECT_ROVER, SELECT_SOL
} from './actions';

const INIT_ROVER = 'curiosity';
const INIT_SOL = 1000;

const selectedRover = (state = INIT_ROVER, action) => {
  switch (action.type) {
    case SELECT_ROVER:
      return action.rover
    default:
      return state
  }
}

const imgs = (state = {
  availableSols: [],
  photosBySol: {
    [INIT_SOL]: []
  },
  selectedSol: INIT_SOL,
  isFetching: false
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
        availableSols: action.availableSols,
        selectedSol: action.selectedSol,
        lastUpdate: action.receivedAt
      }
    case REQUEST_SOL:
      return {
        ...state,
        isFetching: true
      }
    case RECEIVE_SOL:
      return {
        ...state,
        isFetching: false,
        photosBySol: {
          [action.sol]: action.photos
        }
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

function roverData(state = {}, action) {
  switch (action.type) {
    case REQUEST_MANIFEST:
    case RECEIVE_MANIFEST:
    case RECEIVE_SOL:
    case REQUEST_SOL:
     return Object.assign({}, state, {
        [action.rover]: imgs(state[action.rover], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selectedRover,
  roverData
})

export default rootReducer;
