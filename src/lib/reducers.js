import { combineReducers } from 'redux';

import {
  REQUEST_MANIFEST, RECEIVE_MANIFEST,
  REQUEST_SOL, RECEIVE_SOL,
  SELECT_ROVER, SELECT_SOL
} from './actions';

const INIT_ROVER = 'curiosity';
const INIT_SOL = 1000;

const selected = (state = {
  rover: INIT_ROVER,
  sol: INIT_SOL
},
  action) => {
  switch (action.type) {
    case SELECT_ROVER:
      return {
        rover: action.rover,
        sol: action.availableSols[0]
      }
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
        photosBySol: Object.assign({}, state.photosBySol, {
          [action.sol]: action.photos
        })
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

function data(state = {}, action) {
  switch (action.type) {
    case REQUEST_MANIFEST:
    case RECEIVE_MANIFEST:
    case REQUEST_SOL:
    case RECEIVE_SOL:
      return Object.assign({}, state, {
        [action.rover]: imgs(state[action.rover], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  selected,
  data
})

export default rootReducer;
